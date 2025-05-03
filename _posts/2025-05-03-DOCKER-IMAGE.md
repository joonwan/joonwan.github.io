---
layout: post
author: joonwan
tags: [Docker]
title: Docker - Dockerfile
---

# Dockerfile

## 1. Dockerfile 이란?

Docker hub 에는 Container 를 띄울 수 있는 Docker image 들이 있습니다. 이 Docker Image 들도 누군가가 만들어서 올려놓은 것입니다. 그러면 이 Docker Image 는 어떻게 만들 수 있을까요? 

바롤 `Dockerfile` 을 통해 image 를 만들 수 있습니다.

## 2. Dockerfile 만들기

### 2.1 FROM : Base Image 생성

`FROM` 은 Base image 를 생성하는 문법입니다. Docker container 를 특정 초기 이미지를 기반으로 추가적인 세팅을 할 수 있습니다. 여기서 말하는 `특정 초기 이미지`를 `Base Image` 라고 부릅니다.

#### 사용법

```Dockerfile
FROM [image name]
FROM [image name]:[tag name]
```

위와 같이 base image 를 설정할 수 있습니다.

예를 들어 jdk-17 이미지를 만들고 싶을 경우 다음과 같이 Dockerfile 을 작성할 수 있습니다.

```Dockerfile
FROM openjdk:17-jdk
```

이제 이 Dockerfile 을 통해 이미지를 만들 수 있습니다.

```shell
docker build -t myjdk .
```

위 명령은 Dockerfile 을 image 로 빌드해주는 명령어 입니다. `-t` 옵션을 통해 image 의 이름을 설정할 수 있습니다.

```shell
docker image ls;
```

**실행 결과**

```text
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE

myjdk        latest    a36c9466459e   3 years ago   727MB
```

docker image 를 조회하면 방금 만든 이미지를 조회할 수 있습니다.

### 2.2  COPY: file 및 directory 복사

```Dockerfile
COPY [host 에 있는 복사할 파일의 경로] [container 에서 파일이 위치할 경로]
```

`COPY` 는 host 에 있는 파일 또는 디렉토리를 Container 내부로 복사할 수 있게 해줍니다.

#### 2.2.1 file copy

예를 들어 `app.txt` 라는 파일을 container 의 root 디렉토리에 복사할 경우 다음과 같이 Dockerfile 을 작성할 수 있습니다.

```shell
echo "hello world" > app.txt
```

먼저 `app.txt` 라는 파일을 하나 만들어 줍니다. 해당 파일 내부에는 hello world 라는 단어가 들어있습니다.

```Dockerfile
FROM ubuntu
COPY ./app.txt /app.txt
ENTRYPOINT ["/bin/bash", "-c", "sleep 500"] # container 500 초 동안 유지
```

위 처럼 Dockerfile 을 작성한 후 image build 및 container 실행을 해줍니다.

```shell
docker build -t my-server .;
docker run -d my-server;
```

그리고 해당 container 로 접속한 후, file 을 조회합니다.

```shell
docker exec -it d35 bash;
ls app.txt
```

**실행 결과**

```text
app.txt
```

#### 2.2.2 directory copy

Directory 를 복사하는 것은 file 을 복사하는것 과 차이가 있습니다. 

#### Example

먼저 디렉토리를 생성한 뒤 내부에 파일을 하나 생성합니다.

```shell
mkdir my-app;
cd my-app;
echo "hello world!!" > hello.txt;
```


이후 `Dockerfile` 이 있는 디렉토리로 돌아와 Dockerfile 을 다음과 같이 작성합니다.

```Dockerfile
FROM ubuntu

COPY ./my-app/ /my-app

ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

>⚠️ Directory 명 작성시 반드시 디렉토리 명 뒤에 `/` 를 붙여주어야 합니다.

이제 해당 `Dockerfile` 을 이용해  image 를 만들고 Container 로 띄웁니다.

```shell
docker build -t my-server .;
docker run -d my-server;
```

실행중인 Container 로 접속해 디렉토리 리스트를 조회하면 `my-app` 디렉토리가 있는 것을 확인할 수 있습니다.

```shell
docker exec -it cd6 bash;
ls;
```


또한 `my-app` 디렉토리로 들어가 파일을 조회하면 기존에 존재하던 파일이 그대로 있는 것을 확인할 수 있습니다.

```shell
cd my-app;
ls
```

**실행 결과**

```text
hello.txt
```

#### 2.2.3 확장자가 동일한 여러 파일을 Container 내부의 디렉토리로 복사하기

```shell
echo "text data" > text.txt;
echo "reead me" > readme.txt;
```

먼저 `text.txt` 와 `readme.txt` 를 만들어 줍니다.

```Dockerfile
FROM ubuntu

COPY *.txt /txt-dir/

ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

`*` 와일드 카드를 이용해 현재 디렉토리에 있는 모든 `txt` 파일을 Container 내부의 `txt-dir` 디렉토리로 복사할 것입니다.


```shell
docker build -t my-server;
docker run -d my-server;
docker exec -it f36 bash;
ls
```

이전과 동일하게 해당 Docker file 로 이미지를 만든 후 Container 를 띄워 접속하면, `txt-dir` 이 있는 것을 확인할 수 있습니다.

```shell
cd text-dir;
ls;
```

**실행 결과**

```text
readme.txt  text.txt
```

해당 디렉토리로 들어가면 `txt` 확장자를 가진 파일이 모두 저장된 것을 확인할 수 있습니다.

#### 2.2.4 .dockerignore

.dockerignore` 파일은 이미지에 포함시키고 싶지 않은 파일 혹은 디렉토리를 지정할 수 있습니다.

기존에 만든 `readme.txt` 를 제외하고 싶을 경우

**.dockerignore**

```.dockerignore
readme.txt
```

`.dockerignore`  파일에 해당 파일명을 적어주면 됩니다.

```shell
docker build -t my-server .;
docker run -d my-server;
```

이제 컨테이너에 들어가 파일을 조회하면 

```shell
docker exec -it e20 bash;
cd txt-dir;
ls
```

**실행 결과**
```text
text.txt
```

`readme.txt` 를 제외한 `txt` 파일만 있는 것을 확인할 수 있습니다.

### 2.3 ENTRYPOINT : Container 가 시작할 때 실행되는 명령어

`ENTRYPOINT` 는 Container 가 생성되고 최초로 실행될 때 수행되는 명령어를 의미합니다. 

### 사용법

```Dockerfile
ENTRYPOINT [명령문...]
```

배열안에 띄어쓰기를 기준으로 나누어 명령을 넣으면 됩니다.

예를 들어 Container 가 뜬 직후, `echo 'hello world'` 를 실행시켜 보겠습니다.


```Dockerfile
FROM ubuntu
ENTRYPOINT ["/bin/bash", "-c", "echo hello world"]
```

위 도커파일을 기반으로 container 를 실행하면 바로 꺼지는 것을 확인할 수 있습니다.

```shell
docker ps -a
```

**실행 결과**
```text
CONTAINER ID   IMAGE       COMMAND                   CREATED          STATUS                      PORTS     NAMES

0b66e95cac99   my-server   "/bin/bash -c 'echo …"   27 seconds ago   Exited (0) 26 seconds ago             quirky_jemison
```

해당 container log 를 조회하면

```shell
docker logs 0b6
```

**실행 결과**

```text
hello world
```

잘 출력된 것을 확인할 수 있습니다.

### 2.4 RUN : 이미지를 생성하는 과정에서 사용할 명령문 실행

`RUN` 은 이미지 생성 과정에서 명령어를 실행시켜야 할 때 사용합니다.

> 💡 RUN vs ENTRYPOINT
> 
> 두 명령어 모두 명령어를 실행한다는 공통점이 존재하지만, 명령어의 실행 시점에서 차이가 있습니다.
> 
> `RUN` : 이미지를 생성할 때 명령어 실행
> `ENTRYPOINT` : Container 생성 직후 명령어 실행

### Example

```Dockerfile
RUN [명령문]
```

위와 같은 형식으로 `RUN` 을 실행할 수 있습니다.

예를 들어 `git` 이 설치된 ubuntu 이미지를 만들어 보겠습니다.

**Dockerfile**

```Dockerfile
FROM ubuntu

RUN apt update && apt install -y git

ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

해당 이미지를 통해 컨테이너를 생성한 후 접속한 뒤, 다음 명령어를 입력합니다.

```shell
git --version
```

**실행 결과**

```text
git version 2.43.0
```

git 이 잘 설치된 것을 확인할 수 있습니다.

### 2.5 ## WORKDIR : 작업 디렉토리 지정

`WORKDIR` 로 작업 디렉토리를 전환하면, 그 이후에 등장하는 모든 `RUN` `CMD` `ENTRYPOINT` COPY
 `ADD` 명령문을 해당 디렉토리 기준으로 실행됩니다.

작업 디렉토리를 굳이 지정해주는 이유는 컨테이너 내부의 폴더를 깔끔하게 관리하기 위해서입니다.  Container 는 일종의 컴퓨터와 비슷하기 때문에 Dockerfile 을 통해 생성되는 파일들을 특정 디렉토리에 정리해두는 것이 추후에 관리하기가 쉽습니다.

만약 `WORKDIR` 을 쓰지 않으면 컨테이너 내부에 존재하는 기존 파일들과 섞여버리는 문제가 발생합니다.

#### Example

```Dockerfile
WORKDIR [작업 디렉토리로 사용할 절대 경로]
```

예를 들어 빈 디렉토리에 다음과 같이 여러 파일과 디렉토리를 만들어 줍니다.

```shell
echo "app" > app.txt;
touch config.json;
mkdir src;
ls -l
```

**실행 결과**

```text
-rw-r--r--@ 1 user  staff   4  5  3 21:09 app.txt
-rw-r--r--@ 1 user  staff   0  5  3 21:09 config.json
drwxr-xr-x  2 user  staff  64  5  3 21:09 src
```

이제 다음과 같이 Dockerfile 을 작성해 줍니다.

**Dockerfile**

```Dockerfile
FROM ubuntu
COPY ./ ./
ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

작업 디렉토리를 지정하지 않은채로 이미지를 생성합니다.

```shell
docker build -t my-server .
```

이 이미지를 기반으로 Container 를 띄운 뒤 접속을 해봅니다.

```shell
docker run -d my-server;
docker exec -it ec7 bash
```

접속한 후 root 디렉토리에 모든 파일을 조회할 경우

```text
Dockerfile app.txt config.json dev
...
run sbin src usr var
```

이렇게 Container 의 기본 파일 및 디렉토리와 image 를 생성할 때 생긴 파일 및 디렉토리가 모두 섞여 있는 것을 확인할 수 있습니다.

만약에 image 를 통해 생성된 파일이 매우 많아질 경우, Conatiner 를 관리하기 매우 힘들어 집니다.

이제 `WORKDIR` 을 적용한 Dockerfile 을 만들어 보도록 하겠습니다.

```Dockerfile
FROM ubuntu

WORKDIR /my-dir

COPY ./ ./

ENTRYPOINT ["/bin/bash", "-c", "sleep 500"]
```

이제 다시 빌드 후, 컨테이너를 실행한 뒤 접속하면

```text
root@b13366f49672:/my-dir#
```

바로 작업 디렉토리로 들어가진 것을 확인할 수 있습니다. 

```shell
ls
```

**실행 결과**
```text
Dockerfile  app.txt  config.json  src
```

또한 복사한 파일 및 디렉토리가 모두 해당 작업 디렉토리에 있는 것을 확인할 수 있습니다.

### 2.6 EXPOSE : 컨테이너 내부에서 사용중인 포트를 문서화 하기

`EXPOSE` 는 컨테이너 내부에서 어떤 포트에 어떤 프로그램이 실행되는지를 문서화 하는 역할만 합니다.  `-p 8080:8080` 같은 역할은 하지 않습니다.  즉 작동 방식에는 전혀 영향을 끼치지 않습니다.

### Example

```Dockerfile
EXPOSE [포트 번호]

EXPOSE 8080
```



