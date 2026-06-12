---
layout: post
title: Oh My Guide
show_meta: false
---

<p class="project-page-back"><a href="{{ '/projects' | relative_url }}">Projects</a></p>

<section class="project-hero">
  <img src="{{ '/assets/images/projects/oh-my-guide.png' | relative_url }}" alt="Oh My Guide project cover" />
  <div class="project-hero-copy">
    <p class="project-page-meta">2026.02 - 2026.04 · Infra Engineer</p>
    <p class="project-page-summary">외국인 대상 여행 가이드 서비스의 배포 자동화와 운영 관측성 개선을 담당하며, 운영 비용과 장애 확인 시간을 줄이는 데 집중했습니다.</p>
    <div class="project-page-tags">
      <span>Jenkins</span>
      <span>Docker</span>
      <span>Prometheus</span>
      <span>Grafana</span>
      <span>Loki</span>
    </div>
  </div>
</section>

## Overview

Oh My Guide는 한국 관광 정보를 사용자 취향에 맞게 제공하는 여행 가이드 서비스입니다. 저는 인프라 담당으로 참여해 배포 흐름과 모니터링 환경을 정리하고, 운영 과정에서 반복되던 수동 작업을 줄이는 데 집중했습니다.

## What I Worked On

- 서비스 운영을 위한 시스템 아키텍처를 설계하고 배포 경로를 정리했습니다.
- Jenkins, Docker, Docker Compose를 활용해 테스트·빌드·배포 절차를 자동화했습니다.
- Loki, Promtail, Prometheus, Grafana를 연동해 로그와 메트릭을 한곳에서 관측할 수 있는 환경을 구성했습니다.

## Key Decisions

### CI/CD 자동화

수동 배포 절차를 Jenkins 파이프라인으로 옮기고, GitLab merge 트리거를 통해 테스트·빌드·배포·알림 흐름을 연결했습니다. 반복 배포 작업을 줄이면서 배포 과정의 신뢰성을 높이는 데 초점을 맞췄습니다.

### 이미지 경량화와 배포 비용 절감

Multi-stage Build를 적용해 이미지 크기를 `1.4GB -> 654MB`로 줄이고, 빌드 시간도 `105s -> 72s`로 단축했습니다. 실행 환경을 가볍게 만들어 배포 속도와 운영 부담을 함께 낮췄습니다.

### 중앙 집중형 관측 환경 구축

Loki + Promtail을 통해 컨테이너 로그를 모으고, Prometheus + Grafana로 메트릭을 함께 확인할 수 있도록 구성했습니다. 장애 상황에서 로그 위치를 찾는 시간을 줄이고, 운영자가 전체 상태를 더 빠르게 파악할 수 있게 만드는 데 의미가 있었습니다.

## Retrospective

이 프로젝트를 통해 기능 개발만큼 운영 자동화와 관측성이 중요하다는 점을 체감했습니다. 이후에도 “배포가 빨라지는 구조”, “문제를 빨리 발견할 수 있는 구조”를 계속 고민하는 기준점이 된 프로젝트였습니다.
