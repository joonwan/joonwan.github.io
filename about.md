---
layout: post
title: About Me
show_meta: false
---

<p class="about-role">Backend Software Developer</p>

## Core Skills

<section class="about-skills">
  <div class="about-skill-row">
    <strong>Language</strong>
    <div>
      <span>Java</span>
      <span>C</span>
    </div>
  </div>
  <div class="about-skill-row">
    <strong>Framework</strong>
    <div>
      <span>Spring Boot</span>
      <span>JPA / Hibernate</span>
      <span>FastAPI</span>
    </div>
  </div>
  <div class="about-skill-row">
    <strong>Database</strong>
    <div>
      <span>MySQL</span>
      <span>Redis</span>
    </div>
  </div>
  <div class="about-skill-row">
    <strong>Infra</strong>
    <div>
      <span>Docker</span>
      <span>Nginx</span>
      <span>Jenkins</span>
      <span>AWS</span>
    </div>
  </div>
  <div class="about-skill-row">
    <strong>Monitoring</strong>
    <div>
      <span>Grafana</span>
      <span>Prometheus</span>
      <span>Loki</span>
      <span>Promtail</span>
    </div>
  </div>
  <div class="about-skill-row">
    <strong>Collaboration</strong>
    <div>
      <span>Git</span>
      <span>GitHub</span>
      <span>GitLab</span>
      <span>Jira</span>
      <span>Notion</span>
    </div>
  </div>
</section>

## Projects

<section class="about-timeline">
  <article class="about-entry">
    <div class="about-entry-head">
      <h3>CarryPorter</h3>
      <p>보행 약자를 위한 호출형 로봇 서비스</p>
      <span>2026.01 - 2026.02</span>
    </div>
    <ul>
      <li>Backend Leader / 시스템 아키텍처 설계</li>
      <li><code>@TransactionalEventListener</code> + <code>@Async</code> 적용으로 배차·알림 흐름 비동기 분리, 커넥션 점유 시간 단축 및 장애 영향 범위 축소</li>
      <li>배차 큐 dequeue와 로봇 상태 변경을 <code>Lua Script</code>로 묶어 원자적 처리, 중간 실패 시 상태 불일치 방지</li>
      <li>종료 후 요구사항 재분석으로 Redis 과설계 인식, DB 비관적 락 기반 리팩토링 진행 중</li>
    </ul>
  </article>

  <article class="about-entry">
    <div class="about-entry-head">
      <h3>Oh My Guide</h3>
      <p>외국인 대상 여행 가이드 서비스</p>
      <span>2026.02 - 2026.04</span>
    </div>
    <ul>
      <li>Infra Engineer / 시스템 아키텍처 설계</li>
      <li><code>Loki</code> + <code>Promtail</code> 도입으로 컨테이너 로그 중앙 수집, 장애 확인 시간 10분 이상 -> 1분 미만으로 단축</li>
      <li>Multi-stage Build 적용으로 이미지 <code>1.4GB -> 654MB (53%↓)</code>, 빌드 시간 <code>105s -> 72s (31%↓)</code></li>
      <li>GitLab merge 트리거 기반 Jenkins 파이프라인으로 테스트·빌드·배포·알림 절차 자동화</li>
    </ul>
  </article>

  <article class="about-entry">
    <div class="about-entry-head">
      <h3>오손도손</h3>
      <p>수어와 음성을 실시간 대화로 연결하는 양방향 번역 서비스</p>
      <span>2026.04 - 2026.05</span>
    </div>
    <ul>
      <li>Leader / Backend Engineer</li>
      <li>Spring Boot WebSocket 서버 설계 및 구현, 농인·청인 사이클 상태 관리와 이벤트 핸들러 구성</li>
      <li>Speech-to-Sign / Sign-to-Speech REST API 및 FastAPI 연동 클라이언트 개발</li>
      <li>글로스 추천 API 구현, Swagger 명세 및 공통 응답·예외 스키마 설계</li>
    </ul>
  </article>
</section>

## Credentials

<section class="credential-grid">
  <div class="credential-group">
    <h3>Certification</h3>
    <div class="about-list-item">
      <strong>SQLD</strong>
    </div>
  </div>

  <div class="credential-group">
    <h3>Awards</h3>
    <div class="about-list-item">
      <strong>SSAFY 공통 프로젝트 우수상</strong>
    </div>
    <div class="about-list-item">
      <strong>SSAFY 자율 프로젝트 우수상</strong>
    </div>
  </div>

  <div class="credential-group">
    <h3>Education</h3>
    <div class="about-list-item">
      <strong>SSAFY 14기</strong>
      <span>2025.07 - 2026.06</span>
    </div>
    <div class="about-list-item">
      <strong>42 Gyeongsan</strong>
      <span>2024.02 - 2025.06</span>
    </div>
    <div class="about-list-item">
      <strong>부산대학교 해양학과</strong>
      <span>2018.03 - 2025.02</span>
    </div>
  </div>
</section>

## Contact

<div class="about-contact">
  <a href="mailto:joonsong1102@gmail.com" aria-label="Email">
    <img alt="Email" src="https://cdn.simpleicons.org/gmail/EA4335" width="24" height="24" />
  </a>
  <a href="https://github.com/joonwan" aria-label="GitHub">
    <img alt="GitHub" src="https://cdn.simpleicons.org/github/ffffff" width="24" height="24" />
  </a>
  <a href="https://joonwan.github.io" aria-label="Blog">
    <img alt="Blog" src="https://cdn.simpleicons.org/rss/FFA500" width="24" height="24" />
  </a>
  <a href="https://www.linkedin.com/in/joonwan-jeon-765a39363/" aria-label="LinkedIn">
    <img alt="LinkedIn" src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" width="24" height="24" style="filter: invert(45%) sepia(76%) saturate(1280%) hue-rotate(182deg) brightness(93%) contrast(92%);" />
  </a>
</div>
