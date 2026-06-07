---
layout: post
title: About Me
---

# 전준완

<h2 style="font-size:1.85rem; line-height:1.35; margin:0 0 20px 0;">밥은 0.5인분 먹어도 개발은 2인분 하는 백엔드 개발자입니다.</h2>

백엔드 개발을 기반으로 시스템 아키텍처 설계와 시스템 프로그래밍까지 함께 탐구하며, 기능 구현을 넘어 구조와 동작 원리를 이해하려고 노력하고 있습니다.

0.5인분을 먹어도 **5인분의 결과**를 만드는 개발자로 성장하는 것이 목표입니다.

## ⚙ Core Skills

---

<div style="display:flex; flex-wrap:wrap; gap:24px; margin:16px 0 8px 0;">
  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">Language</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="Java" src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=openjdk&logoColor=white" />
      <img alt="C" src="https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black" />
    </div>
  </div>

  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">Framework</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" />
      <img alt="JPA Hibernate" src="https://img.shields.io/badge/JPA%20%2F%20Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white" />
    </div>
  </div>

  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">DB</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />
      <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
    </div>
  </div>

  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">Infra</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
      <img alt="Nginx" src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" />
      <img alt="Jenkins" src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white" />
      <img alt="AWS" src="https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white" />
    </div>
  </div>

  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">Monitoring</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="Grafana" src="https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white" />
      <img alt="Prometheus" src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white" />
      <img alt="Loki" src="https://img.shields.io/badge/Loki-F2CC0C?style=flat-square&logo=grafana&logoColor=black" />
    </div>
  </div>

  <div style="flex:1 1 220px; min-width:220px; padding:16px; border:1px solid rgba(255,255,255,0.28); border-radius:12px;">
    <h3 style="margin-top:0;">Communication</h3>
    <div style="display:flex; flex-wrap:wrap; gap:8px;">
      <img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" />
      <img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" />
      <img alt="GitLab" src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=gitlab&logoColor=white" />
      <img alt="Jira" src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=jira&logoColor=white" />
      <img alt="Notion" src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white" />
    </div>
  </div>
</div>

## ◧ Projects

---

### CarryPorter <span style="font-size:0.8em; font-weight:400; opacity:0.7;">| 2026.01 - 2026.02</span>

- Backend Leader / 시스템 아키텍처 설계
- `@TransactionalEventListener` + `@Async` 적용으로 배차·알림 흐름 비동기 분리, 커넥션 점유 시간 단축 및 장애 영향 범위 축소
- 배차 큐 dequeue와 로봇 상태 변경을 `Lua Script`로 묶어 원자적 처리, 중간 실패 시 상태 불일치 방지
- 종료 후 요구사항 재분석으로 Redis 과설계 인식, DB 비관적 락 기반 리팩토링 진행 중

### Oh My Guide <span style="font-size:0.8em; font-weight:400; opacity:0.7;">| 2026.02 - 2026.04</span>

- Infra Engineer / 시스템 아키텍처 설계
- `Loki` + `Promtail` 도입으로 컨테이너 로그 중앙 수집, 장애 확인 시간 10분 이상 -> 1분 미만으로 단축
- Multi-stage Build 적용으로 이미지 `1.4GB -> 654MB (53%↓)`, 빌드 시간 `105s -> 72s (31%↓)`
- GitLab merge 트리거 기반 Jenkins 파이프라인으로 테스트·빌드·배포·알림 절차 자동화

## ✓ Certifications

---

- SQLD

## ★ Awards

---

- SSAFY 공통 프로젝트 우수상
- SSAFY 자율 프로젝트 우수상

## ✦ Education

---

- SSAFY 14기 (2025.07 - 2026.06)
- 42 Gyeongsan (2024.02 - 2025.06)
- 부산대학교 해양학과 (2018.03 - 2025.02)

## ✉ Contact

---

<div style="display:flex; gap:18px; align-items:center; margin-top:8px;">
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
