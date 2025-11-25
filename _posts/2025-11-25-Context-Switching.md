---
layout: post
author: joonwan jeon
tags: [operating system]
category: operating system
---

# Context Switching

![](/assets/images/os/context-switching.png)

context switching 이란 cpu 를 한 프로세스에서 다른 프로세스로 넘겨주는 과정을 의미합니다. cpu 가 다른 프로세스에게 넘어갈 때 kernel 은 다음과 같은 과정을 수행합니다.

- cpu 를 내어주는 process 상태를 해당 process 의 pcb 에 저장
- cpu 를 새롭게 얻는 process 의 상태를 pcb 에서 읽음

> [!NOTE]
> ALU 란 산술 논리 연산장치를 의미합니다.
> cpu 의 핵심 연산장치로 다음 연산을 수행할 수 있습니다.
> - 산술 연산 : +, -, *, /
> - 논리 연산: AND, OR, NOT, XOR
> - 비교 연산 : >, <, ==

> [!NOTE]
> Memory Map 이란 process 가 사용할 수 있는 가상 메모리 주소공간입니다. 각 프로세스별로 독립적으로 관리되며 code, data, stack, heap 영역으로 구성됩니다.

System call 이 발생한다고 해서 반드시 context switching 이 발생하는 것은 아닙니다.

![](/assets/images/os/no_context_switching.png)

예를들어, process A 가 실행되던 중 interrupt 또는 system call 을 호출한 경우 kernel 이 cpu 제어권을 가집니다. 이후 만약 다시 process A 에게 cpu 점유권이 돌아간다면 이는 context switching 이 아닙니다.

![](/assets/images/os/yes_context_switching.png)
하지만 kernel 에게 제어권이 남어간 이후 kernel 이 다른 process 에게 cpu 를 할당한다면 이는 context swtiching 이 맞습니다.

1번의 경우 에도 cpu 정보, register 정보 등을 pcb 에 저장해야 하지만 context switching 을 하는 2번의 경우 오버헤드가 더 큽니다.

이중 가장 큰 원인은 **cache memory flush** 라는 작업인데, context switching 을 할 때 이전 process 의 cache memory 를 지우는 과정입니다. 참고로 1번 과정에서는 cache memory flush 가 발생하지 않습니다.