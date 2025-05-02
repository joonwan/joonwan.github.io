---
layout: post
author: joonwan
tags: [Docker]
title: Docker - Volume
---

# Docker Volume

![docker volume](/assets/images/docker/volume/docker-volume.png)

Docker Volume 이란, Docker Container 에서 데이터를 영속적으로 저장하기 위한 방법입니다.

Volume 은 Container 내부의 저장 공간을 사용하는 것이 아닌, **Host** 의 저장 공간을 사용하는 형태입니다.

# Volume 이 필요한 이유

실행 중인 컨테이너를 삭제할 경우, Container 내부에 들어있는 데이터는 모두 사라집니다. 

예를 들어 MySQL 이 실행 중인 Container 를 삭제할 경우 Database 에 저장된 내용이 모두 사라지게 됩니다. 실습을 통해 눈으로 확인해 보겠습니다.

### 1. MySQL Container 생성 및 실행

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 mysql;
docker ps;
```

**실행 결과**
```text
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS                               NAMES
c55847e33400   mysql     "docker-entrypoint.s…"   3 seconds ago   Up 3 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   reverent_tu
```


먼저 MySQL Container 를 하나 실행행 한 후, 정상적으로 container 가 실행되는지 확인합니다.


### 2. Container 접속 및 Database 생성

```shell
docker exec -it c55847e33400 bash
```

MySQL 이 실행되고 있는 컨테이너로 들어간 뒤


```shell
mysql -u root -p
```

위 명령을 통해 MySQL 서버로 접속합니다.

```sql
create database testDB;
show databases;
```

**실행 결과**
```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| testDB             |
+--------------------+
```

`testDB` 라는 데이터 베이스를 만든 뒤 조회를 해보면 정상적으로 데이터베이스가 생성된 것을 확인할 수 있습니다.

### 3. MySQL Container 삭제

```shell
docker rm -f c55847e33400;
docker ps -a
```


**실행 결과**
```text
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

다시 Host PC 로 돌아와 MySQL Container 를 삭제합니다.


### 4. Container 다시 생성 후 실행

이전 과 동일하게 다시 MySQL Container 를 생성한 후 해당 Containier 에 접속해 데이터 베이스 목록을 조회할 경우,

```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

이와 같이 기존에 생성한 `testDB` 가 사라진 것을 확인할 수 있습니다.

이렇게 Container 는 기본적으로 Container 내부의 저장공간을 사용하기 때문에, Container 가 삭제될 경우, Container 내부에 있는 데이터 또한 같이 삭제 됩니다. 

영속화가 필요한 데이터의 경우 Container 화 함께 삭제되면 안되기 때문에, Volume 을 도입해야 합니다.

# Docker Volume 도입

`Volume` 은 Host 의 저장 공간을 Container 와 공유하는 기술입니다. 따라서 Container 가 삭제되어도 Host 에 저장 공간은 삭제되지 않기 때문에 데이터를 영속화 시킬 수 있습니다.

## Volume 을 사용해 MySQL Container 띄우기

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -v /Users/[user]/Downloads/dev/mysql-docker/mysql-data:/var/lib/mysql mysql
```

`-v` 옵션을 사용할 경우 Host 저장공간 과 Container 의 저장 공간을 연결할 수 있습니다. 

```shell
-v [host 데이터 저장 경로]:[container 내부 경로]
```

위 형식으로 Host 와 Container 의 저장 공간을 공유 할 수 있습니다.

## DB 생성 및 조회

이제 이전 단계 에서 했던대로, Container 에 접속한 뒤 `testDB` 라는 데이터베이스를 다시 생성해 보겠습니다.

```sql
create database testDB;
show databases;
```

**실행 결과**

```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| testDB             |
+--------------------+
```

데이터베이스가 잘 생성된 것을 확인 할 수 있습니다. 

## Container 삭제 및 재생성

이제 다시 해당 컨테이너를 삭제한 후 다시 같은 방식으로 Container 를 띄우겠습니다.

```shell
docker rm -f 76d5e7706c46;
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -v /Users/[user]/Downloads/dev/mysql-docker/mysql-data:/var/lib/mysql mysql;
```

## Container 내부 접속 후 데이터베이스 조회

새로 생성된 Container 내부로 들어간 뒤, MySQL 서버로 접속해 Database 를 조회합니다.

```shell
docker exec -it cef9f3c4c90f bash;
mysql -u root -p;
```

```sql
show databases;
```

**실행 결과**

```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| testDB             |
+--------------------+
```

이전에 생성한 `testDB` 가 그대로 남아 있는 것을 확인할 수 있습니다.


# Docker Volume 사용시 주의점

## 1. MYSQL 초기 비밀번호 설정값은 -e 옵션을 통해 변경 불가

만약 Docker Volume 을 사용하는 Container 를 종료하고 설정한 비밀번호를 변경해서 다시 실행시키면 어떤읿이 발생할까요?

먼저 MySQL Container 를 실행시킬 때 MySQL Root 의 비밀벊로를 1234 로 설정한 후 실행합니다.

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 -v /Users/[user]/Downloads/dev/mysql-docker/mysql-data:/var/lib/mysql mysql
```

이제 다시 해당 컨테이너를 삭제한 후 비밀번호를 123 으로 설정해 다시 container 를 실행시킵니다.

```shell
docker rm -f 1d2;
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -v /Users/[user]/Downloads/dev/mysql-docker/mysql-data:/var/lib/mysql mysql;
```

docker container 를 조회하면

```shell
docker ps -a
```

```text
CONTAINER ID   IMAGE     COMMAND                   CREATED         STATUS         PORTS                               NAMES
3f6750732e18   mysql     "docker-entrypoint.s…"   8 seconds ago   Up 7 seconds   0.0.0.0:3306->3306/tcp, 33060/tcp   ecstatic_napier
```

정상적으로 실행되는 상태로 조회 됩니다.

하지만 container 내부로 진입해 mysql server 를 접속할 경우 변경된 비밀번호를 입력시

```shell
docker exec -it 3f6750732e18 bash;
mysql -u root -p
```

**실행 결과**

```text
Enter password: 
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
```

비밀번호가 올바르지 않다는 Error 메시지가 출력됩니다.

이는 Volume 을 통해 MySQL Container 를 생성할 때, host 의 디렉토리에 초기 `-e` 옵션으로 설정한 MySQL 비밀번호 또한 설정된 상태에서 저장되었기 때문입니다.

따라서 비밀 번호를 변경한 상태로 다시 Container 를 띄워도 해당 새로운 비밀번호를 통해 MySQL server 로 접근할 수 없습니다.

이러한 문제에 대한 해결책은 volume 으로 잡은 host 의 디렉토리를 삭제하거나, mysql 비밀번호를 직접 바꾸는 방법이 있습니다.


## 2. Volume 으로 잡을 host 디렉토리에 파일이 있을 경우

먼저 기존 host 의 volume 을 잡을 디렉토리의 파일을 모두 삭제한 뒤 아무 파일을 생성해 보겠습니다.

```shell
cd /Users/[user]/Downloads/dev/mysql-docker/mysql-data;
rm -rf *;
echo "text" > text.txt;
ls;
```

**실행 결과**

```text
text.txt
```

이제 해당 디렉토리와 Container 를 연결해 Container 를 띄어 보겠습니다.

```shell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123 -v /Users/[user]/Downloads/dev/mysql-docker/mysql-data:/var/lib/mysql mysql;
docker ps -a;
```

**실행 결과**

```text
CONTAINER ID   IMAGE     COMMAND                   CREATED          STATUS                      PORTS     NAMES
5700a3feffef   mysql     "docker-entrypoint.s…"   43 seconds ago   Exited (1) 41 seconds ago             serene_shockley

```

cointainer 가 비정상적으로 종료된 것을 볼 수 있습니다. 

```shell
docker logs 5700a3feffef;
```

종료 로그를 조회해 보면

```text
2025-05-02 09:56:40+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 9.3.0-1.el9 started.
2025-05-02 09:56:40+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2025-05-02 09:56:40+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 9.3.0-1.el9 started.
2025-05-02 09:56:40+00:00 [Note] [Entrypoint]: Initializing database files
2025-05-02T09:56:40.879230Z 0 [System] [MY-015017] [Server] MySQL Server Initialization - start.
2025-05-02T09:56:40.881249Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 9.3.0) initializing of server in progress as process 81
2025-05-02T09:56:40.884954Z 0 [ERROR] [MY-010457] [Server] --initialize specified but the data directory has files in it. Aborting.
2025-05-02T09:56:40.884960Z 0 [ERROR] [MY-013236] [Server] The designated data directory /var/lib/mysql/ is unusable. You can remove all files that the server added to it.
2025-05-02T09:56:40.885146Z 0 [ERROR] [MY-010119] [Server] Aborting
2025-05-02T09:56:40.885860Z 0 [System] [MY-015018] [Server] MySQL Server Initialization - end.
```

MySQL 을 실행할 때 필요한 파일들이 없다는 것을 알 수 있습니다. 

이는 Docker Volume 을 사용할 때 Host 디렉토리에 파일이 있을 경우, Container 의 경로에 해당 파일들을 덮어 씌우기 때문에 발생하는 일입니다. 따라서 Volume 을 잡을 때 해당 디렉토리를 생성하지 않거나, 빈 디렉토리 상태로 연결해야 합니다.

