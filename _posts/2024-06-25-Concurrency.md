---
title: "Concurrency"
date: 2024-07-02T16:10:52
categories: ['OS']
tags: ['OS', 'CS']
---


## 동시성 문제란?

---

특정한 데이터를 공유하는 프로세스들은 서로 공유하는 데이터를 읽고 쓸 수 있다. 서로 공유하는 데이터에 여러 프로세스들이나 thread들이 동시에 접근하여 값을 갱신할 때 값의 정확성이 손상되는 문제를 `동시성 문제`라고 한다.

## 동시성 문제가 발생하는 원인

---

```c
#include <stdio.h>
#include <pthread.h>

int sum;

void *plus()
{
	int i;
	for(i = 0; i < 100000; i++)
		sum++;
	pthread_exit(0);
}

void  *minus()
{
	for(int i =0 ; i < 100000; i++)
		sum--;
	pthread_exit(0);
}

int main()
{
	pthread_t tid1, tid2;
	pthread_create(&tid1, NULL, plus, NULL);
	pthread_create(&tid2, NULL, minus, NULL);
	pthread_join(tid1, NULL);
	pthread_join(tid2, NULL);
	printf("sum = %d\n", sum);
}
```

위 예제는 thread 1 은 공유하는 데이터 `sum` 의 값을 100000 증가, thread 2 는 값을 100000 감소 시키는 작업을 수행하다. 최종 결과를 0으로 예상할 수 있지만 실제로 실행 결과는 다른 값이 도출된다.

- 실행 결과

```
c3r17s5% ./a.out
sum = 100000
c3r17s5% ./a.out
sum = -100000
c3r17s5% ./a.out
sum = -82070
c3r17s5% ./a.out
sum = 0
c3r17s5% ./a.out
sum = 99444
c3r17s5% ./a.out
sum = -34338
c3r17s5% ./a.out
sum = -62664
c3r17s5% ./a.out
sum = 0

```

이를 이해하기 위해서는 공유하는 데이터 접근 로직을 분석해 볼 필요가 있다.

각 thread가 공유하는 데이터를 증가시키는 로직은 다음과 같다.

```c
sum++;
sum--;
```

이를 기계어 수준으로 번역할 경우 다음과 같다.

```
// plus
register1 = count
register1 = register1 + 1
count = register1

//minus
register1 = count
register1 = register1 - 1
count = register
```

이 명령 줄 사이에서 Context Switching 이 발생한다.

<aside>
💡 Context Switching이란?

일반적으로 OS 는 메모리상에 존재하는 여러 프로세스들을 병행하게 처리한다. 즉 특정 프로세스를 일부 실행시킨 뒤 실행 상태를 `PCB` 에 저장시킨 뒤 다음 프로세스의 정보를 꺼내와 해당 프로세스를 실행시킨다.

</aside>

더 간단한 예제를 통해 동시성 문제가 발생하는 원리에 대해 알아보자.

![context_switching.png](%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%B5%E1%84%89%E1%85%A5%E1%86%BC%20%E1%84%86%E1%85%AE%E1%86%AB%E1%84%8C%E1%85%A6%E1%84%80%E1%85%A1%20%E1%84%87%E1%85%A1%E1%86%AF%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%AB%20a9044a40ab0d4a0c9e9781a499195d09/context_switching.png)

흐름은 다음과 같다.

1. [thread 1] : thread 1 이 자신의 register 에 공유하는 데이터의 값을 복사`count = 5` `register=5`
2. [thread 1] : 해당 register 의 값을 1 증가시킴 `count = 5` `register=6`
3. [Context Switching] : Context Switching이 발생하여 thread 2 가 CPU점유 `count = 5`
4. [thread 2] : 공유하는 데이터를 thread 2 의 register 에 복사 `count = 5` `register=5`
5. [thread 2] : register 값을 1 감소 `count = 5` `register = 4`
6. [thread 2] : register 값을 count 에 복사 `count = 4` `register = 4`
7. [Context Switching] : Context Switching이 발생하여 thread 1 가 CPU점유 `count = 4 register = 6` 
8. [thread 1] : register 값을 count 에 복사 `count = 6` `register=6`

이렇게 여러개의 thread 가 동시에 공유하는 데이터에 접근을 해 Race Condition 이 발생하여 값의 정확성이 깨져버린 것이다.

<aside>
💡 Race Condition이란?

공유하는 데이터에 여러 프로세스 또는 thread 가 동시에 접근하여 값을 갱신할 경우 해당 값의 결과가 접근하는 process 또는 thread 의 접근 순서에 의존하는 상황을 의미한다.

</aside>

이러한 문제를 해결하기 위해서는 동기화 작업이 필요하다.
