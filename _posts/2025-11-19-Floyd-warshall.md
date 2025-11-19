---
layout: post
author: joonwan jeon
tags: [algorithm]
category: algorithm
---

# Floyd Warshall 알고리즘

## 언제 사용하는가?

Flody Warshall 알고리즘은 모든 노드간 최단 경로를 탐색하기 위해 사용하는 알고리즘 입니다. 특징은 다음과 같습니다.

- 음수 가중치 edge 가 있어도 수행가능
- 동적 계획법의 원리를 이용해 알고리즘 수행
- 시간 복잡도: $O(v^3)$ (v: 노드 수)

## Floyd Warshall 핵심 이론 
<img width="531" height="415" alt="image" src="https://github.com/user-attachments/assets/90cdadc5-9b0d-4605-a6e3-65d22b3a61c5"/>

A 노드에서 B 노드까지 최단 경로를 구했다고 가정했을 때, 최단경로 위에 K 노드가 존재한다면 그것을 이루는 부분경로 역시 최단경로라는 것입니다.
예를 들어 1 -> 5 가 최단 경로일 경우, 1 -> 4 그리고 4 -> 5 역시 최단경로가 됩니다.
즉 `전체 경로의 최단 경로는 부분 경로의 최단경로 조합으로 구성됩니다`
따라서 다음과 같은 점화식이 도출됩니다.

```Text
D[s][e] = MIN(d[s][e], d[s][k] + d[k][e])
```
##  구현하는 방법

### 1. 리스트 선언 및 초기화 
<img width="531" height="353" alt="image" src="https://github.com/user-attachments/assets/8c4da335-9496-44fe-bbf1-3a3f6bcec43b" />

- `D` 라는 2차원 배열을 생성합니다.
- `D[S][E]` 에는 node S 에서 node E 까지의 최단거리를 저장합니다.
- S 와 E 값이 같을 경우 0 으로, 다른 값은 INF 로 초기화 합니다. 자기 자신에게 가는 시간은 0이기 때문입니다.

| s\e | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | INF | INF | INF | INF |
| 2 | INF | 0 | INF | INF | INF |
| 3 | INF | INF | 0 | INF | INF |
| 4 | INF | INF | INF | 0 | INF |
| 5 | INF | INF | INF | INF | 0 |

> [!TIP]
> Floyd Wallshall 문제는 Node 의 수가 많지 않습니다. 시간 복잡도가 $O(v^3)$ 이기 때문입니다. 따라서 인접 행렬 형태로 노드간의 간선 정보를 표현할 수 있습니다.

### 2. 그래프 데이터 저장하기

- S : 출발노드, E : 도착 노드, W : 가중치 라고 할 때 `D[S][E] = W` 로 간선의 정보를 리스트에 저장합니다.

| s\e | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 8 | 3 | INF | INF |
| 2 | INF | 0 | INF | -4 | 15 |
| 3 | INF | INF | 0 | 13 | INF |
| 4 | INF | INF | INF | 0 | 2 |
| 5 | INF | INF | INF | 5 | 0 |

### 3. 점화식으로 리스트 업데이트 하기

아래 점화식을 이용해 list 를 업데이트를 하게되면 모든 노드간 최단경로 탐색이 완료됩니다.

```Text
for 경유지 k 에 관해 (1 ~ N) {
  for 출발노드 S 에 관해 (1 ~ N) {  
    for (도착노드 E 에 관해 (1 ~ N) {
      D[S][E] = MIN(D[S][E], D[S][K] + D[K][E]);
    }
  }
}
```
