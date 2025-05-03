---
layout: post
author: joonwan
tags: [Docker]
title: Docker - Compose
---

# Docker Compose 란?

여러개의 Container 를 하나의 서비스로 정의하고 구성해, 하나의 묶음으로 관리할 수 있게 도와주는 툴 입니다.

Docker Compose 를 사용하면 다음과 같은 장점이 있습니다.

### 1. 여러개의 Container 를 관리하는데 용이

여러개의 Container 로 이루어진 복잡한 애플리케이션을 한번에 관리 즉 한 파일로 관리 할 수 있게 해줍니다. 여러 컨테이너를 하나의 환경에서 실행하고 관리하는데 도움이 됩니다.

### 2. 복잡한 명령어로 실행시키던 걸 간소화 할 수 있음

MySQL Container 를 띄울 때 다음과 같은 명령어를 사용합니다.

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -v /Users/[user]/Downloads/develop/docker-mysql/mysql-data:/var/lib/mysql mysql
```

이렇게 긴 명령어를 매번 치고 기억하는 것은 힘듭니다.  하지만 Docker compose 를 사용할 경우 이렇게 복잡한 명령어를 사용하지 않아도 됩니다. 단순히 `docker compse up` 명령만 실행시키면 됩니다.


# Docker Compose 로 Nginx 실행 시키기

## compose.yml 작성

단순히 nginx container 를 실행 시킬 때 다음과 같은 명령어를 사용합니다.

```shell
docker run -d --name webserv -p 80:80 nginx
```

위 명령어 대신 Docker compose 를 활용해 nginx container 를 띄워보겠습니다.

docker compose 를 하기 위해서는 `compose.yml` 이라는 파일이 필요합니다.

**compose.yml**

```yml
services:
  my-wev-server:
  container_name: webserv
  image: nginx
  ports:
    - 80:80
```

**services**
docker compose 에서 하나의 container 를 `service` 라고 부릅니다. `services` 는 여러개의 service (container) 를 작성하기 전에 쓰는 명령어 중 하나입니다.

**my-web-server**
service 의 이름입니다. 작성자가 원하는 대로 이름을 작성할 수 있습니다. 위 파일에서는 service 의 이름을 `my-web-server` 라고 정한 것입니다.

**container_name**
지정한 이미지로 container 를 띄울 때, 해당 container 의 이름을 지정하는 것입니다. `container_name: ` 뒤에 container 의 이름을 지정할 수 있습니다.

위 파일의 경우 container 의 이름이 `web-serv` 로 지정됩니다.

**image**
image 는 어떤 이미지를 기반으로 container 를 띄울 것인지 정의할 수 있게 합니다. 위 파일의 경우 `nginx` 라는 이미지를 기반으로 container 를 띄우겠다고 설정한 것입니다.

**ports**
host 의 port 와 container 의 port 를 연결하는 것입니다. 위 파일의 경우 host 의 80 번 포트와 container 의 80 번 포트를 연결한 것 입니다.

## Container 띄우기

이제 위 `compose.yml` 을 바탕으로 실행시켜 보겠습니다.

```shell
docker compose up
```

**실행 결과**

```text
webserv  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
webserv  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/

...
...

webserv  | 2025/05/03 14:15:23 [notice] 1#1: start worker process 39
webserv  | 2025/05/03 14:15:23 [notice] 1#1: start worker process 40
```

정상적으로 nginx 가 동작하는 것을 확인할 수 있습니다. 하지만 foreground 환경에서 실행되기 떄문에 우리는 nginx container 가 동작하는 동안 shell 을 통해 다른 작업을 할 수 없습니다.

따라서 background 로 실행시키기 위해서 compose 를 실행 시킬 때 `-d` 옵션을 주어야 합니다.

```shell
docker compose up -d
```

container 가 잘 돌아가는 지 조회해 보면

```shell
docker ps 
```

**실행 결과**

```text
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS          PORTS                NAMES

b95f98c3462c   nginx     "/docker-entrypoint.…"   4 minutes ago   Up 32 seconds   0.0.0.0:80->80/tcp   webserv
```

`webserv` 라는 container 가 잘 돌아가는 것을 확인할 수 있습니다.

## Container 내리기

Container 를 내릴 때 다음 명령어를 사용할 수 있습니다.

```shell
docker compose down
```

`docker compose down` 은 compose 로 실행 시킨 container 를 `중지`시키고 `삭제` 시키는 명령입니다.

```shell
docker ps -a
```

**실행 결과**

```text
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

중지된 Container 없이 말끔히 삭제 된 것을 볼 수 있습니다.

# Docker Compose 로 MySQL 띄우기

MySQL container 를 띄우기 위해 다음 명령을 사용할 수 있습니다.

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -v /Users/[user]/Downloads/develop/docker-mysql/mysql-data:/var/lib/mysql mysql
```

위 명령어를 기반으로 `compose.yml` 을  다음과 같이 작성할 수 있습니다.

```yml
services:
  my-db:
  image: mysql
  environment:
    MYSQL_ROOT_PASSWORD: 1234
  volumes:
    - ./mysql_data:/var/lib/mysql
  ports:
    - 3306:3306
```

- volume 을 지정할 때 `volumes` 를 통해 지정할 수 있습니다. 참고로 compose 에서 host 의 경로를 지정할 때 상대 경로를 사용할 수 있다는 장점이 있습니다.

- 환경 변수를 설정할 때에는 `environment` 로 설정할 수 있습니다.

> 💡 command < - > compose.yml
> 
>  [composerize](https://www.composerize.com/) : docker cli -> compose.yml 변환
>  [decomposerize](https://www.decomposerize.com/) : compose.yml -> docker cli 로 변환

# Docker Compose 로 Spring boot 띄우기

기존에는 docker hub 에서 image 를 받았지만, 이번에는 docker file 로 빌드한 이미지를 통해 compose 를 하는 예시를 들어보겠습니다.

```yml
services:  
  spring-app:  
    build: .  
    ports:  
      - "8080:8080"
```

`build` 를 통해 dockerfile 로 빌드되는 이미지를 통해 Container 를 띄울 수 있습니다.

```shell
docker compose up -d
```

이후 위 명령어를 통해 spring boot container 를 띄울 수 있습니다.

그런데 코드의 내용이 수정되었다고 가정해 보겠습니다. 따라서 build 된 jar file 또한 변경된 상태입니다. 만약 jar 파일이 바뀌었지만 위 명령어를 수행할 경우 기존에 빌드된 이미지를 통해 container 를 띄우기 때문에 변경내용이 반영된 spring boot 가 container 에서 실행되는 것이 아니라, 변경전의 spring boot 가 container 내부에서 돌아가게 됩니다.

따라서 jar 파일이 변경될 경우 이미지를 다시 빌드해, 이 새로 빌드된 이미지를 기반으로 container 를 띄워야 합니다.

따라서 다음 명령을 통해 이미지를 다시 빌드 시켜 컨테이너를 띄워야 합니다.

```shell
docker compose up -d --build
```
# 자주 사용하는 Docker Compose CLI 명령어

## $ docker compose up

```shell
docker compose up
```

 위 명령어는 `compose.yml` 에서 정의한 container 들을 foreground 환경에서 실행 시키는 명령어 입니다. 

만약 background 에서 실행시키고 싶을 경우 다음과 같이 `-d` 옵션을 줄 수 있습니다.

```shell
docker compose up -d
```


## $ docker compose ps

```shell
docker compose ps
```

docker compose 를 통해 여러 컨테이너들이 동시에 뜰 수 있습니다. 단순 `docker ps` 명령어는 실행 중인 모든 컨테이너를 다 조회하는 반면, `docker compose ps` 는 `compose.yml` 에 정의된 컨테이너 중 실행중인 컨테이너만 조회해서 보여줍니다.

만약 `compose.yml` 에 정의된 container 중 중지된 container 도 조회하고 싶을 경우 다음과 같이 `-a` 옵션을 줄 수 있습니다.

```shell
docker compose ps -a
```

## $ docker compose logs

```shell
docker compose logs
```

`compose.yml` 에 정의된 container 들의 로그들을 종합적으로 보기 위해 사용하는 명령어 입니다.

**실행 결과**

```text
webserv  | 2025/05/03 14:37:02 [notice] 1#1: start worker process 40
```

맨 왼쪽을 보면 container 이름을 확인할 수 있습니다.

## $ docker compose up --build

```shell
docker compose up --build
```

이미지를 다시 빌드해서 conatiner 를 올려야 할 경우 해당 명령을 사용할 수 있습니다. 

## $ docker compose pull

```shell
docker compose pull
```

이미지를 다운받거나 업데이트할 경우 사용하는 명령입니다.

## $ docker compose down

```shell
docker compose down
```

compose 를 통해 띄운 모든 container 를 종료시킬 때 사용하는 명령입니다. compose 로 띄운 모든 container 를 중지 및 삭제 시킵니다.


