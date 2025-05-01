---
layout: post
author: joonwan
tags: [MySQL]
title: MySQL - DATE, DATETIME, TIMESTAMP 
---


# Date 

`Date` 는 날짜 부분만 저장하고 시간 부분은 없는 값을 저장할 때 사용합니다.  `YYYY-MM-DD` 형식으로 저장하고 보여줍니다. `1000-01-01` 부터 `9999-12-31` 까지의 범위를 나타낼 수 있습니다.

# DATETIME

날짜와 시간을 모두 포함하는 값을 저장할 때 사용합니다.  MySQL 은 DATETIME 값을 `YYYY-MM-DD hh:mm:ss` 형식으로 저장하고 보여줍니다. `1000-01-01 00:00:00`  부터 `9999-12-31 23:59:59` 까지의 범위를 나타낼 수 있습니다.

## TIMESTAMP

`TIMESTAMP` 는 `DATETIME` 과 마찬가지로 날짜와 시간 모두를 저장할 때 사용합니다. `1970-01-01 00:00:01 UTC` 부터 `2038-01-19 03:14:07` 까지의 범위를 나타낼 수 있습니다.

## DATETIME vs TIMESTAMP

## 시간대 처리

`DATETIME` 은 입력한 값을 그대로 저장합니다. 또한 서버나 세션의 TIMEZONE 설정에 영향을 받지 않습니다. 즉 어떤 환경에서 조회해도 항상 동일한 값을 반환합니다.

반면 `TIMESTAMP` 는 값을 저장할 때 UTC 로 변환하여 저장하고, 조회할 때는 현재 연결된 TIMEZONE 에 맞추어 변환해서 보여줍니다. 즉 **같은 값을 저장해도 TIMEZONE 이 다를 경우 결과가 달라질 수 있습니다.**

### Example

`DATETIME` 과 `TIMESTAMP` 의 시간대 처리 차이점을 확인해보기 위해 테이블을 하나 만들어 보겠습니다.

```sql
CREATE TABLE test_dt_ts (
	dt DATETIME,
	ts TIMESTAMP
);
```

현재 시간으로 데이터를 넣습니다.

```sql
INSERT INTO test_dt_ts values (NOW(), NOW());
```

**실행 결과 (KST, Asia/Seoul 기준)** 

```text
mysql> select * from test_dt_ts;

+---------------------+---------------------+
| dt                  | ts                  |
+---------------------+---------------------+
| 2025-05-01 10:51:36 | 2025-05-01 10:51:36 |
+---------------------+---------------------+

1 row in set (0.00 sec)
```

이제 TIMEZONE 을 변경한 후 조회해 봅니다.

```sql
SET time_zone = 'America/New_York';
```

```text
mysql> select * from test_dt_ts;

+---------------------+---------------------+
| dt                  | ts                  |
+---------------------+---------------------+
| 2025-05-01 10:51:36 | 2025-05-01 06:51:36 |
+---------------------+---------------------+
```

정리하면 다음과 같습니다.

- DATETIME 
	- `저장` : 값이 TIMEZONE 에 영향을 받지 않고 그대로 저장.
	- `조회` : 입력된 값이 그대로 조회.

- TIMESTAMP
	- `저장` : 현재 TIMZONE 을 기준으로 UTC 로 변환해서 저장.
	- `조회` : UTC 값을 현재 TIMEZONE 에 맞게 변환해서 조회.

# REFERENCE

[MySQL docs](https://dev.mysql.com/doc/refman/8.4/en/datetime.html)