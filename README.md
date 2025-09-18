# 전기요금 절감 컨설팅 웹사이트

## 🚀 100% 무료 폼 제출 시스템 (GitHub Actions 활용)

이 시스템은 **완전 무료**로 폼 제출을 GitHub Issues와 Actions로 처리합니다.

### 작동 방식

1. 사용자가 폼 작성 후 제출
2. GitHub Issue 페이지로 이동 (자동으로 내용 채워짐)
3. 사용자가 "Submit new issue" 클릭
4. GitHub Actions가 자동으로:
   - CSV 파일에 저장 (`submissions.csv`)
   - 자동 답변 댓글 작성
   - 이슈 자동 종료
   - (선택) 이메일 알림 전송

### 장점
- ✅ **100% 무료** (GitHub 무료 계정 사용)
- ✅ 서버 필요 없음
- ✅ 데이터베이스 필요 없음
- ✅ 모든 문의 내역 GitHub Issues에 보관
- ✅ CSV 파일로 자동 백업

## 설정 방법

### 1. GitHub Repository 설정
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/lucasha/warmenergy.git
git push -u origin main
```

### 2. GitHub Pages 활성화
1. Repository → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `root`
4. Save

### 3. Labels 생성 (중요!)
Repository → Issues → Labels에서 다음 라벨 생성:
- `form-submission` (필수)
- `consultation` (필수)
- `processed`

### 4. (선택) 이메일 알림 설정
이메일 알림을 받고 싶다면:

1. Gmail 앱 비밀번호 생성:
   - Google 계정 → 보안 → 2단계 인증 활성화
   - 앱 비밀번호 생성

2. GitHub Secrets 설정:
   - Repository → Settings → Secrets and variables → Actions
   - `EMAIL_USERNAME`: Gmail 주소
   - `EMAIL_PASSWORD`: 앱 비밀번호

## 사용 방법

1. 웹사이트에서 폼 작성
2. "무료 컨설팅 신청하기" 클릭
3. GitHub 로그인 (무료 계정 가능)
4. "Submit new issue" 클릭
5. 완료! 자동으로 처리됨

## 문의 데이터 확인

### 방법 1: CSV 파일
- Repository의 `submissions.csv` 파일에 모든 문의 저장
- Excel에서 바로 열기 가능

### 방법 2: GitHub Issues
- 모든 문의가 Issues 탭에 보관
- 검색, 필터링 가능
- 댓글로 고객과 소통 가능

## 파일 구조
```
warmenergy/
├── index.html          # 메인 페이지
├── styles.css          # 스타일
├── script.js           # 폼 제출 로직
├── .github/
│   └── workflows/
│       ├── send-email-notification.yml  # 자동 처리 워크플로우
│       └── form-submission.yml         # CSV 저장 워크플로우
└── submissions.csv     # 문의 내역 (자동 생성)
```

## 문제 해결

### Issue 생성이 안 될 때
- GitHub 로그인 확인
- Repository가 public인지 확인

### GitHub Actions가 실행되지 않을 때
- Labels (`form-submission`, `consultation`) 생성 확인
- Actions 탭에서 워크플로우 활성화 확인

### 이메일이 오지 않을 때
- GitHub Secrets 설정 확인
- Gmail 앱 비밀번호 확인

## 비용
- GitHub: **무료** (Public repository)
- GitHub Actions: **무료** (월 2,000분 제공)
- GitHub Pages: **무료**
- 총 비용: **₩0**