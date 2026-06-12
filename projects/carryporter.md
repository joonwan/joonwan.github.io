---
layout: post
title: CarryPorter
show_meta: false
---

<p class="project-page-back"><a href="{{ '/projects' | relative_url }}">Projects</a></p>

<section class="project-hero">
  <img src="{{ '/assets/images/projects/carryporter.png' | relative_url }}" alt="CarryPorter project cover" />
  <div class="project-hero-copy">
    <p class="project-page-meta">2026.01 - 2026.02 · Backend Leader</p>
    <p class="project-page-summary">보행 약자를 위한 호출형 로봇 서비스의 백엔드 아키텍처를 설계하고, 실시간 배차 흐름을 안정적으로 운영할 수 있는 구조를 고민했습니다.</p>
    <div class="project-page-tags">
      <span>Spring Boot</span>
      <span>MQTT</span>
      <span>Redis</span>
      <span>Lua</span>
    </div>
  </div>
</section>

## Overview

CarryPorter는 호출형 로봇 서비스를 통해 보행 약자의 이동 편의를 돕는 프로젝트입니다. 사용자 요청, 로봇 상태, 배차 결과가 실시간으로 이어지는 구조였기 때문에 단순 기능 구현보다 흐름 분리와 상태 일관성이 중요했습니다.

## What I Worked On

- 실시간 호출 서비스의 백엔드 아키텍처를 설계하고 요청 흐름을 정리했습니다.
- 배차·제어·알림 로직을 이벤트 기반으로 분리해 장애 영향 범위를 줄이는 방향으로 구조를 구성했습니다.
- 로봇과 서버 간 역할을 MQTT 기반으로 나누고, Redis/Lua를 활용해 배차 상태 변경을 원자적으로 처리했습니다.

## Key Decisions

### 비동기 후속 처리 분리

`@TransactionalEventListener`와 `@Async`를 적용해 배차, 알림, 후속 처리를 메인 요청 흐름과 분리했습니다. 이를 통해 커넥션 점유 시간을 줄이고, 후속 작업 실패가 사용자 요청 전체를 흔들지 않도록 구조를 나눴습니다.

### 실시간 메시징 구조 설계

사용자 요청과 로봇 제어가 실시간으로 이어져야 했기 때문에 MQTT를 기반으로 서버와 로봇의 책임을 구분했습니다. 덕분에 제어 명령과 상태 전달 경로를 분리할 수 있었고, 실시간 파이프라인을 더 명확하게 관리할 수 있었습니다.

### Redis/Lua 기반 상태 일관성 확보

배차 큐 dequeue와 로봇 상태 변경을 Lua Script로 하나의 흐름에 묶어 처리했습니다. 중간 실패 시 중복 배차나 상태 불일치가 생기지 않도록 원자성 확보에 초점을 맞췄습니다.

## Retrospective

프로젝트 종료 후 요구사항을 다시 분석하며 Redis가 일부 구간에서 과설계였다는 점도 확인했습니다. 현재는 DB 비관적 락 기반 구조로 리팩토링을 진행하며, 기능 구현 이후에도 설계 선택을 계속 돌아보는 습관을 가져가고 있습니다.
