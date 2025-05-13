---
layout: post
author: joonwan
tags: [WEB]
title: WEB - Web Server 란?
---

# Web Server 정의

Web Server 는 크게 두가지 의미로 정의됩니다.

**1. 하드웨어 측면**

    웹 서버 소프트웨어와 웹 사이트의 컴포넌트 파일들을 저장하는 컴퓨터를 의미합니다. 컴포넌트에는 HTML, image, CSS stylesheets, Javascript file 등이 있습니다. 

**2. 소프트웨어 측면**

    웹 사용자가 어떻게 호스트 파일에 접근하는지를 관리하는 소프트웨어를 의미합니다.

즉 web 사용자들이 컴퓨터의 자원을 요청하면 적절한 자원을 반환해주는 컴퓨터 및 소프트웨어를 `Web Server` 라고 합니다.

# Web Server 의 기능

Web Server 는 web page 를 클라이언트에게 전달하는 역할을 합니다. 주로 image, CSS, Javascript 가 포함된 HTML 문서를 클라이언트에게 전달합니다.

이때 클라이언트는 `HTTP` 를 통해 Web Server 에게 리소스를 요청하며 서버는 해당 리소스를 반환하거나, 처리할 수 없을 경우 에러 메세지를 전달합니다.

# 웹 사이트 공개를 위한 Web Server 종류

## 1. 정적 웹 서버

서버가 요청을 받으면, 요청 받은 파일을 있는 그대로 브라우저에 전송해 주는 웹 서버 입니다. 즉 파일 내용이 변하지 않는 것이 특징 입니다.

주로 단순한 블로그, 회사 소개 페이지 등에 사용됩니다.

## 2. 동적 웹 서버

서버가 요청을 받을 경우, 파일을 업데이트 해서 브라우저에게 전송하는 웹서버 입니다. 예를 들어 서버가 DB 에 있는 정보를 불러와 HTML Template에 채워 넣어 최종 웹 페이지를 만듭니다.

# HTTP 를 통한 통신

Web Server 는 client 와 `HTTP` 를 통해 통신합니다. HTTP 는 다음 특징을 가지고 있습니다.

- text 기반 : 사람들이 읽을 수 있는 텍스트를 기반으로 요청 및 응답합니다.

- stateless : 서버와 클라이언트가 이전 통신을 기억하지 않습니다. 예를 들어 HTTP 만으로는 사용자의 비밀번호, 미완료 거래의 진행 상황들을 기억할 수 없습니다.

HTTP 통신을 할 때 client 와 server 는 다음과 같은 책임을 가지고 있습니다.

- client
    - HTTP 요청을 보낼 때, 서버 자원의 URL 을 함께 보내야함.

- server
    - 반드시 모든 HTTP 요청에 응답을 해야 하며, 최소한 오류 메시지라도 보내야함.
    - URL 에 해당하는 파일이 있을 경우 파일의 내용을 client 에게 전송 해야함.
    - 파일이 없을 경우, 서버는 동적으로 파일을 생성하거나 오류메시지를 응답해야함.


# 정적 컨텐츠 vs 동적 컨텐츠

웹 서버는 크게 두가지 컨텐츠를 제공합니다.

- static content : 정적 컨텐츠
- dynamic content : 동적 컨텐츠

정적 컨텐츠는 웹 서버에 저장된 자원을 그대로 클라이언트에게 반환되는 컨텐츠를 의미합니다. 반면 동적 컨텐츠는 웹 서버에서 요청에 따라 자원이 생성되어 클라이언트에게 반환되는 컨텐츠 입니다. 

# 정리

Web server 는 요청을 보낸 클라이언트에게 적절한 응답을 주는 컴퓨터 또는 해당 컴퓨터 내부의 소프트웨어를 의미합니다. Client 와 Server 는 HTTP 를 통해 통신을 하며 Client 에게 요청을 받을 경우 웹 서버는 모든 HTTP 요청에 대해 응답해야 하는 의무를 가지고 있습니다.

Web Server 는 Client 에게 정적 컨텐츠 또는 동적 컨텐츠를 제공합니다. 정적 컨텐츠를 제공할 경우, 컴퓨터 내부에 있는 파일을 그대로 client 에게 반환하게 되며, 동적 컨텐츠를 제공할 경우, 요청에 따라 web server 가 database 등 을 이용해 실시간으로 응답을 생성해서 반환하게 됩니다.

# REFERENCE

- [wkikipedia](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%84%9C%EB%B2%84)
- [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server)