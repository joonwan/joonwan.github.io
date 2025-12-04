---
layout: post
author: joonwan jeon
tags: [docker, docker compose]
category: trouble shooting
---

# 내 Spring Container 가 MySQL Container 를 못찾은 이유

## 문제를 만난 배경

spring 과 mysql 를 docker compose 를 사용해 함께 띄우는 실습을 진행하고 있었습니다. 모든 file 작성을 완료하고 `docker compose up -d` 명령을 사용하여 container 를 띄운 후 container 상태를 보니 spring container가 계속해서 죽는 문제가 발생했습니다.

이때 사용한 `application.yaml` 과 `dockerfile` 그리고 `compose.yaml` 은 다음 과 같았습니다.

**application.yaml**

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: 1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```

**Dockerfile**

```dockerfile
FROM eclipse-temurin:17-jdk

COPY build/libs/*SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**compose.yaml**

```yaml
services:
  my-server:
    build: .
    ports:
      - 8080:8080
    depends_on:
      my-db:
        condition: service_healthy
  my-db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 1234
      MYSQL_DATABASE: mydb
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: ["CMD", "mysqladmin", "ping"]
      interval: 5s
      retries: 10
```

분명 `compose.yaml` 에서 health check 를 한 뒤 spring container 를 띄웠다고 생각했지만 spring container 는 database 를 찾을 수 없어 계속 종료 되었었습니다.

## 문제 1. 잘못된 Database URL

**application.yaml** 의 database url 을 살펴보겠습니다.

```yaml
url: jdbc:mysql://localhost:3306/mydb
```

여기서 host 를 보면 `localhost` 로 잡혀있는 것을 확인할 수 있습니다. 만약 일반적으로 intellij 등 ide 에서 실행할 경우 localhost 는 현재 spring 을 실행시키는 컴퓨터를 의미합니다.

하지만 container 로 spring app 을 띄울 경우 localhost 는 해당 컴퓨터가 아닌 spring 을 실행시킬 container 를 의미합니다.

따라서 docker compose 를 사용할 때 url 의 host 를 mysql server 가 실행되는 container 로 설정 해주어야 합니다.

docker compose 에서 다른 프로그램이 실행되는 container 를 구분할  service 의 이름으로 구분할 수 있습니다.

위 **compose.yaml** 에서 mysql server 가 실행되는 service 의 이름이 `my-db` 이기 때문에 다음과 같이 `application.yaml` 을 수정해야 합니다.

**수정된 application.yaml**

```yaml
spring:
  datasource:
    url: jdbc:mysql://my-db:3306/mydb
    username: root
    password: 1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```
## 문제 2. Docker Image 재빌드 문제

database url을 고친 후 다음 명령어를 실행했습니다:

1. `./gradlew clean build` 
2. `docker compose up -d`

**하지만 여전히 spring container가 mysql을 찾지 못하고 계속 죽는 문제가 발생했습니다.**

### 원인 분석

문제의 원인은 `compose.yaml`의 `build` 동작 방식에 있었습니다.

**compose.yaml**
```yaml
services:
  my-server:
    build: .  # ← 이 부분!
```

이 설정의 의미는 "현재 디렉토리의 `Dockerfile`을 사용해 이미지를 빌드하겠다"입니다. 

저는 당연히 `docker compose up`을 실행하면 매번 Dockerfile로 이미지를 새로 빌드한다고 생각했습니다.

**하지만 실제 동작은 달랐습니다:**
- 이미지가 **없으면** → Dockerfile로 빌드
- 이미지가 **이미 있으면** → 기존 이미지 재사용 (빌드 안 함!)

### 문제의 흐름

1. 처음 `docker compose up` → `localhost`가 포함된 jar로 이미지 생성
2. application.yaml 수정 (`localhost` → `my-db`)
3. `./gradlew clean build` → 수정된 설정으로 jar 재생성 
4. `docker compose up` → **기존 이미지 재사용** 
5. 결과: 여전히 `localhost`가 포함된 이미지로 컨테이너 실행

즉, jar 파일은 새로 만들어졌지만 Docker 이미지는 새로 만들어지지 않았던 것입니다!

### 해결

이미지를 명시적으로 재빌드하니 정상 동작했습니다:
```bash
docker compose build  # 이미지 강제 재빌드
docker compose up -d
```

또는 한 번에:
```bash
docker compose up -d --build  # 빌드 + 실행
```

느낀점

사실 이 모든 문제가 docker 그리고 docker compose 의 기본 동작원리를 제대로 이해하지 못해서 발생한 문제였던것 같습니다. 앞으로 docker container 가 어떤 식으로 동작하는지, compose 의 각 키워드는 어떤것을 나타내고 어떻게 동작하는지 깊게 학습할 것입니다.
