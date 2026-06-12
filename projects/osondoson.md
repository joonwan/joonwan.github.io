---
layout: post
title: 오손도손
show_meta: false
---

<p class="project-page-back"><a href="{{ '/projects' | relative_url }}">Projects</a></p>

<section class="project-hero">
  <img src="{{ '/assets/images/projects/osondoson.png' | relative_url }}" alt="오손도손 project cover" />
  <div class="project-hero-copy">
    <p class="project-page-meta">2026.04 - 2026.05 · Team Leader / Backend Engineer</p>
    <p class="project-page-summary">수어와 음성을 실시간 대화로 연결하는 양방향 번역 서비스에서 서버 구조와 팀 진행 방향을 함께 이끌었습니다.</p>
    <div class="project-page-tags">
      <span>Spring Boot</span>
      <span>FastAPI</span>
      <span>JPA</span>
      <span>WebSocket</span>
    </div>
  </div>
</section>

## Overview

오손도손은 AI 수어 인식과 3D 아바타 렌더링 기술을 결합해 농인의 수어와 청인의 음성을 실시간으로 연결하는 양방향 번역 서비스입니다. 저는 팀 리더이자 백엔드 담당으로 참여해 디바이스와 클라우드 서버를 잇는 흐름을 설계했습니다.

## What I Worked On

- 팀 리더로서 전체 진행 방향을 조율하고 서버 역할 분리를 정리했습니다.
- Spring Boot 기반 WebSocket 서버를 구현해 농인·청인 사이클 상태와 이벤트 핸들러를 관리했습니다.
- Speech-to-Sign / Sign-to-Speech REST API와 FastAPI 연동 클라이언트를 개발하고, 공통 응답·예외 스키마를 설계했습니다.

## Key Decisions

### 실시간 상태 관리 구조

양방향 대화 흐름에서는 누가 어떤 단계에 있는지 서버가 정확히 알고 있어야 했습니다. WebSocket 서버에서 사이클 상태와 이벤트 핸들러를 명확히 나눠, 실시간 상호작용이 끊기지 않도록 상태 중심 구조를 잡았습니다.

### 서비스 간 연동 경계 정리

AI 모델 서버와 애플리케이션 서버 역할을 분리하고, FastAPI 연동 클라이언트를 별도 계층으로 구성했습니다. 이를 통해 모델 호출 로직이 애플리케이션 전반으로 퍼지지 않게 하고, 연동 포인트를 더 명확하게 유지할 수 있었습니다.

### 명세와 응답 구조 통일

글로스 추천 API를 구현하면서 Swagger 명세와 공통 응답·예외 스키마를 함께 정리했습니다. 기능 추가보다 협업과 유지보수에 유리한 인터페이스를 만드는 데 초점을 맞췄습니다.

## Retrospective

오손도손은 팀 리더 역할과 서버 구현을 함께 맡으며 기술과 협업을 동시에 다뤄야 했던 프로젝트였습니다. 이후에도 실시간 시스템을 설계할 때는 기능 자체보다 상태 흐름과 서비스 간 경계를 먼저 보는 습관을 유지하고 있습니다.
