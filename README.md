# journal-rules: 인류학도를 위한 학술지 규정 종합 포털

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Site-brightgreen?style=flat-square&logo=github)](https://kunwryu.github.io/journal-rules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Accessibility](https://img.shields.io/badge/Accessibility-UDL%202025%20%2B%20WCAG%20AA-009ccf?style=flat-square)](https://kunwryu.github.io/journal-rules/specs.html)
[![AI Crawler Shield](https://img.shields.io/badge/Crawler%20Shield-16%20AI%20Bots%20Blocked-red?style=flat-square)](https://kunwryu.github.io/journal-rules/)
[![Standard: KCA & ICCS](https://img.shields.io/badge/Standard-KCA%20%26%20ICCS-8A3B14?style=flat-square)](https://kunwryu.github.io/journal-rules/)
[![Stack: Vanilla Web](https://img.shields.io/badge/Stack-Vanilla%20Web%20(Zero--Dep)-E34F26?style=flat-square&logo=html5&logoColor=white)](https://kunwryu.github.io/journal-rules/specs.html)

> **사단법인 한국문화인류학회 『한국문화인류학』**과 **서울대학교 비교문화연구소 『비교문화연구』**의 공식 간행 규정, 게재 절차, 원고 작성 요령, 연구 윤리 규정을 1:1로 비교 대조하고, 서지 인용 서식을 실시간으로 시뮬레이션할 수 있는 바닐라 웹 표준 기반 무의존성(Zero-Dependency) 학술 정적 웹 포털입니다.

---

## 📌 프로젝트 개요 (Overview)

한국 문화인류학 분야의 대표 학술지인 『한국문화인류학』(KCA)과 『비교문화연구』(ICCS)는 본문 내주 표기법(쉼표 유무, 쪽수 연결 기호), 공저자 연결 기호(`and` vs `&`), 번역서 원서 연도 병기 방식, `<자료>` 섹션의 정렬 및 표제 부호(겹낫표 vs 홑낫표) 등에서 뚜렷한 서지 관례 차이를 보입니다.

본 프로젝트는 문화인류학 연구자, 대학원생, 투고자가 규정 불일치로 인해 겪는 서식 혼선을 줄이고, 투고 규격을 사전에 철저히 준수할 수 있도록 돕기 위해 제작되었습니다.

- **표준 출처 (Ground Truth)**:
  - 『한국문화인류학』: 사단법인 한국문화인류학회 공식 웹사이트 공시 학술 규정(간행 규정, 게재 절차, 원고 작성 요령, 연구 윤리 규정)
  - 『비교문화연구』: 서울대학교 비교문화연구소 『비교문화연구』 제32권 1호(간행본 부록, pp. 525~548) 정식 수록 규정집

---

## 🌟 주요 기능 (Key Features)

### 1. 1:1 종합 비교 매트릭스 (`index.html`)
- **학술지 서식 핵심 대조표**: 투고자가 가장 빈번하게 혼동하는 소제목, 인용 부호, 쉼표 표기법의 1:1 핵심 차이점 대조
- **간행 규정 & 투고 조건 1:1 비교표**: 발간 일정, 마감일, 원고 분량 기준, 심사료, 게재료 산정 체계의 세부 차이점 비교
- **하브루타 변증법적 비교 해설**: 각 학술지 서지 규범의 맥락과 배경 설명

### 2. 학술지별 상세 규정 안내 (`kca.html`, `iccs.html`)
- **『한국문화인류학』**: 간행 규정, 3인 심사 결과에 따른 최종 판정 기준표, 학회지 게재 절차, 원고 작성 요령 표준 가이드 1~16번 공식 전 조항 및 서지 실례, 연구 윤리 규정(젠더혁신 정책, 특수관계인 사전 고지)
- **『비교문화연구』**: 간행 규정, 연구 윤리 규정, 원고 작성 요령 표준 가이드 전 조항, 유형별(1인·2인·다수 공저, 편저, 번역서, 프로시딩, 학위논문, 사료/법령) 표준 서식 실례
- **Zotero/Mendeley용 CSL 파일 배포 연계**: 『한국문화인류학』 투고 규격(내주 및 국·한·일·영 언어순 정렬) 자동 생성을 위한 CSL(Citation Style Language) 파일 다운로드 연계  
  *(※ 안내: 본 CSL 파일은 한국문화인류학회에서 공식 배포하는 파일이 아니며, 연구자의 투고 편의를 위해 [류건욱 (Kun Wook Ryu)](https://kunwryu.github.io/)이 웹사이트(`Guacamoled`)에서 제공하는 개인 제작 오픈 스타일 파일입니다.)*
- **원터치 복사 지원**: 각 규정 및 실례 블록에 고대비 복사 버튼(`.copy-btn`)을 제공하여 서식을 즉시 클립보드로 복사 가능
- **정밀 앵커 퀵점프**: 사이드바 하위 목차 클릭 시 상단 고정 헤더에 가려지지 않도록 `scroll-margin-top: 135px` 오프셋 보정 완료

### 3. 인용 자동 변환기 & 시뮬레이터 (`converter.html`)
- 선택 가능한 10종 문헌 프리셋 지원:
  1. 일반 저서 (단독 저자)
  2. 학술지 수록 논문 (단독 저자)
  3. 2인 공동 저술 (국문 / 영문)
  4. 번역서 (외국 저자 번역본)
  5. 통계 및 공공자료 (`<자료>` 섹션)
  6. 신문 및 잡지 기사 (`<자료>` 섹션)
  7. 인터넷 웹자료 (`<자료>` 섹션)
  8. 법령 및 공공 사료 (`<자료>` 섹션)
  9. 학술대회 발표논문 (프로시딩)
  10. 석·박사 학위논문
- 본문 괄호 내주와 참고문헌 목록 양식을 양대 학술지 스타일로 실시간 자동 변환 및 원클릭 복사

### 4. 자가 체크리스트 (`checklist.html`)
- 원고 구성, 서지 인용, 익명화 조치, 연구 윤리 준수 항목을 단계별로 점검하는 메타인지 자가진단 시스템
- 브라우저 로컬스토리지(`localStorage`) 기반 진행률 자동 저장 및 원터치 초기화 지원

### 5. 웹사이트 제작 환경 및 도구 (`specs.html`)
- 엔지니어링 아키텍처 및 6-pack MCP 오케스트레이션 명세
- 추가 예정 학술지(『한국이민학』, 『한국여성학』, 『경제와 사회』, 『문화와 사회』) 확장 파이프라인 소개

---

## 🎨 디자인 시스템 & 웹 접근성 (Design & Accessibility)

- **UDL (Universal Design for Learning) 2025 프레임워크** 및 **WCAG 2.1 AA** 고대비 원칙 준수
- **한국어 어절 단위 줄 바꿈 최적화**: `word-break: keep-all;`, `overflow-wrap: break-word;`, `text-wrap: pretty;`를 글로벌 적용하여 긴 학술 용어 중간 잘림 현상 방지 및 인쇄물 수준의 조판 가독성 구현
- **큐레이션 컬러 팔레트**:
  - `Primary`: Deep Pine Teal (`#0A4746`) / Ultra Deep Pine (`#052625`)
  - `Secondary`: Antique Ochre Gold (`#CCAB18`)
  - `Accent`: Soft Pearl Mist (`#F2EEF1`)
  - `Complementary`: Warm Terracotta (`#B84A39`) & Deep Royal Indigo (`#1E3A8A`)
- **초경량 무의존성 구조**: 외부 프레임워크(React, Vue, Tailwind 등) 없이 순수 바닐라 HTML5, modern CSS, ES6+ JavaScript만으로 제작되어 0.1초대 초고속 로딩 및 장기 무보수 안정성 보장

---

## 🛡️ AI 거버넌스 및 크롤러 차단 정책 (CRAWLER_SHIELD v2)

본 포털은 학술 콘텐츠 보호와 윤리적 AI 거버넌스를 위해 다층 차단 방어막을 탑재하고 있습니다.

- **`robots.txt`**: 검색엔진(Google, Bing, Naver 등)의 정규 색인은 허용하되, GPTBot, CCBot, ClaudeBot, Bytespider, Google-Extended 등 **16종 상용 생성형 AI 학습 스크래퍼를 명시적으로 차단**
- **`ai.txt`**: Spawning AI 및 기계가독형 거버넌스 표준에 따라 무단 데이터 마이닝 및 AI 모델 학습 불허(`Allow-Training: false`, `Allow-Text-Mining: false`) 선언
- **`_headers`**: Netlify/Cloudflare 호스팅 배포 시 `X-Robots-Tag: noai, noimageai` 및 보안 헤더 자동 전송

---

## 📂 파일 구조 (File Structure)

```text
journal-rules/
├── index.html       # 메인 페이지: 1:1 종합 비교 매트릭스 & 학술지 서식 핵심 대조표
├── kca.html         # 『한국문화인류학』 규정 전용 상세 페이지 & CSL 다운로드 연계
├── iccs.html        # 『비교문화연구』 규정 전용 상세 페이지
├── converter.html   # 인용 자동 변환기 & 시뮬레이터 (10종 프리셋)
├── checklist.html   # 자가 체크리스트 (로컬스토리지 자동 저장)
├── specs.html       # 웹사이트 제작 환경 및 도구
├── style.css        # UDL 기반 공통 통합 CSS 스타일시트 (keep-all & 스티키 오프셋 탑재)
├── portal.js        # 변환기 엔진, 클립보드 복사, 체크리스트 스크립트
├── robots.txt       # 검색엔진 허용 및 AI 학습 봇 차단 규약
├── ai.txt           # Spawning AI 기계가독형 AI 마이닝 거부 정책
├── _headers         # 배포 웹서버 응답 보안 헤더 (X-Robots-Tag 등)
├── .nojekyll        # GitHub Pages Jekyll 빌드 간섭 차단 파일
├── LICENSE          # 오픈소스 라이선스 (MIT) 및 저작권자 고지
└── README.md        # 프로젝트 소개 및 기술 문서
```

---

## 🌐 공식 웹사이트 (Live Website)

본 포털은 GitHub Pages를 통해 배포되어 전 세계 어디서든 웹 브라우저로 즉시 접속할 수 있습니다:
- **공식 포털 주소**: [https://kunwryu.github.io/journal-rules/](https://kunwryu.github.io/journal-rules/)

---

## 💻 로컬 실행 방법 (Local Getting Started)

별도의 빌드 도구나 패키지 설치(`npm install` 등)가 전혀 필요하지 않습니다.

### 방법 1: 정적 파일 바로 열기
브라우저에서 `index.html` 파일을 직접 더블 클릭하여 실행할 수 있습니다.

### 방법 2: 로컬 HTTP 서버 실행 (권장)
```bash
# Python 내장 서버
python -m http.server 8080

# 또는 Node.js npx serve
npx serve .
```
서버 실행 후 브라우저에서 `http://localhost:8080`으로 접속합니다.

---

## 📄 라이선스 (License)

- 포털의 웹 코드, UI 설계 및 스크립트: Copyright (c) 2026 Kun Wook Ryu ([MIT License](LICENSE))
- 수록된 각 학술지의 규정 본문 내용 및 저작권: **사단법인 한국문화인류학회** 및 **서울대학교 비교문화연구소**에 각각 귀속
- 『한국문화인류학』 CSL 스타일 파일: [류건욱 (Kun Wook Ryu)](https://kunwryu.github.io/) 개인 제작 (`Guacamoled`)
