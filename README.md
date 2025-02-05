# What's Your ETF?

## 📌 프로젝트 소개
**What's Your ETF?** 는 사용자가 원하는 금액으로 다양한 주식을 비율에 따라 투자하고, 투자 성과를 확인할 수 있는 포트폴리오 웹 애플리케이션입니다.  
이 프로젝트는 **React**와 **Vite**를 기반으로 개발되었으며, 실시간으로 다른 사용자들의 포트폴리오를 탐색하거나 복사하여 활용할 수 있습니다.

### 주요 기능
✔️ **맞춤형 포트폴리오 구성**  
사용자는 원하는 금액과 투자 비율에 따라 포트폴리오를 생성할 수 있습니다. 예를 들어, 50만 원 중 20%를 애플 주식에, 나머지 80%를 삼성전자 주식에 투자할 수 있습니다.  

✔️ **수익률 순위 확인**  
사용자 간 투자 성과를 기반으로 한 수익률 순위를 제공하여 성과를 비교하고 동기를 부여합니다.  

✔️ **포트폴리오 복사 기능**  
다른 사용자의 포트폴리오를 탐색하고, 이를 복사하여 자신의 투자 금액에 맞게 조정할 수 있습니다.  

✔️ **시각화 및 데이터 분석**  
**Chart.js** 및 **Recharts**를 활용하여 투자 비율과 성과를 직관적으로 이해할 수 있는 차트를 제공합니다.

✔️ **목표 수익률 도달 알림**  
**SSE** 를 활용하여 목표 수익률 도달 알림을 제공합니다.


---

## 🛠 기술 스택

### 📦 프론트엔드
- **React 18** - 사용자 인터페이스 구축
- **Vite** - 빠른 개발 환경 및 빌드 도구
- **Redux Toolkit** - 상태 관리
- **React Router** - 라우팅 처리
- **Bootstrap** 및 **Tailwind CSS** - 반응형 UI 스타일링
- **Chart.js** 및 **Recharts** - 데이터 시각화

### 📦 상태 관리 및 데이터 처리
- **Redux Persist** - 상태 지속성
- **Redux Thunk** - 비동기 작업 처리
- **Axios** - API 통신
- **Lodash** - 유틸리티 함수

---

## 📂 프로젝트 구조

```
what's-your-etf/
│── public/                   # 정적 파일
│── src/
│   ├── assets/               # 이미지, 폰트 등 에셋 파일
│   ├── components/           # 공통 UI 컴포넌트
│   │   ├── buttons/          # 버튼 관련 컴포넌트
│   │   ├── context/          # 컨텍스트 관리 컴포넌트
│   │   ├── etfDetail/        # ETF 세부정보 컴포넌트
│   │   ├── grade/            # 등급 관련 컴포넌트
│   │   ├── home/             # 홈 페이지 컴포넌트
│   │   ├── layouts/          # 레이아웃 구성 컴포넌트
│   │   ├── modal/            # 모달 컴포넌트
│   │   ├── myPocket/         # 내 포트폴리오 관련 컴포넌트
│   │   ├── notification/     # 알림 컴포넌트
│   │   ├── ranking/          # 랭킹 관련 컴포넌트
│   │   ├── search/           # 검색 관련 컴포넌트
│   │   ├── signup/           # 회원가입 컴포넌트
│   │   └── stock/            # 주식 정보 컴포넌트
│   ├── lib/                  # 공통 라이브러리
│   │   └── apis/             # API 요청 모듈
│   ├── routers/              # 라우터 구성
│   ├── routes/               # 라우트 설정
│   │   ├── auth/             # 인증 관련 라우트
│   │   ├── etfDetail/        # ETF 세부정보 라우트
│   │   ├── grade/            # 등급 라우트
│   │   ├── init/             # 초기화 라우트
│   │   ├── login/            # 로그인 라우트
│   │   ├── membership/       # 회원관리 라우트
│   │   ├── myEtfDetail/      # 내 ETF 세부정보 라우트
│   │   ├── myPocket/         # 내 포트폴리오 라우트
│   │   ├── notification/     # 알림 라우트
│   │   ├── ranking/          # 랭킹 라우트
│   │   ├── rankingDetail/    # 랭킹 세부정보 라우트
│   │   ├── search/           # 검색 라우트
│   │   ├── signup/           # 회원가입 라우트
│   │   └── user/             # 사용자 관련 라우트
│   ├── stores/               # Redux 상태 관리
│   │   └── auth/             # 인증 상태 관리
│   ├── App.jsx               # 메인 애플리케이션
│   ├── main.jsx              # React 진입점
│── .gitignore                # Git 무시할 파일 설정
│── package.json              # 프로젝트 종속성 및 스크립트
│── vite.config.js            # Vite 설정 파일
│── README.md                 # 프로젝트 소개 문서
```

---

## 🚀 실행 방법

### 1️⃣ 프로젝트 클론
```sh
git clone https://github.com/Park-sETF/front.git
cd front
```

### 2️⃣ 패키지 설치
```sh
npm install
```

### 3️⃣ 개발 서버 실행
```sh
npm run dev
```
> 기본적으로 `http://localhost:5173`에서 실행됩니다.

### 4️⃣ 빌드 및 배포
```sh
npm run build
```
빌드된 정적 파일은 `dist/` 디렉토리에 생성됩니다.

---

## 🔧 환경 변수 설정
환경 변수 설정을 위해 `.env` 파일을 프로젝트 루트에 생성하고 아래 내용을 추가하세요.
```env
VITE_API_URL=http://localhost:3000/api
```
> 실제 API 서버 URL로 수정해주세요.

---

## 🛠 사용된 패키지 목록

### 📌 주요 종속성 (dependencies)
```json
{
  "@reduxjs/toolkit": "^2.3.0",
  "axios": "^1.7.7",
  "bootstrap": "^5.3.3",
  "chart.js": "^4.4.6",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-redux": "^9.1.2",
  "react-router-dom": "^6.28.0",
  "recharts": "^2.13.3",
  "redux": "^5.0.1",
  "redux-persist": "^6.0.0"
}
```

---

## 📝 라이선스
본 프로젝트는 MIT 라이선스를 따릅니다. 자유롭게 수정 및 배포할 수 있습니다.

---

## 📬 문의
개선 사항이나 버그가 있다면 **GitHub Issues**를 통해 알려주세요! 😊