# 전기요금 절감 컨설팅 웹사이트

## 🚀 완전 무료 이메일 전송 시스템 (Google Apps Script)

**로그인 불필요! 버튼 클릭만으로 바로 이메일 전송!**

### 특징
- ✅ **100% 무료** (Google 계정만 있으면 OK)
- ✅ **사용자 로그인 불필요**
- ✅ 버튼 클릭 즉시 lucas@warmguys.com으로 전송
- ✅ 서버 구축 불필요
- ✅ 월 20,000건까지 무료

## 설정 방법 (5분 소요)

### 1단계: Google Apps Script 설정

1. **Google Apps Script 열기**
   - https://script.google.com 접속
   - Google 계정으로 로그인

2. **새 프로젝트 생성**
   - "새 프로젝트" 클릭
   - 프로젝트명: "전기요금 컨설팅 이메일"

3. **코드 복사/붙여넣기**
   - `google-apps-script-code.js` 파일의 모든 코드 복사
   - 기존 코드 삭제 후 붙여넣기
   - Ctrl+S (또는 Cmd+S) 저장

4. **웹 앱으로 배포**
   - 상단 메뉴: 배포 → 새 배포
   - 유형 선택: "웹 앱"
   - 설정:
     - 설명: "이메일 전송 API"
     - 실행: "나"
     - 액세스 권한: **"모든 사용자"** (중요!)
   - "배포" 클릭
   - 권한 승인 (처음 한 번만)

5. **URL 복사**
   - 배포 완료 후 나타나는 URL 복사
   - 예: `https://script.google.com/macros/s/AKfycbxxxxxx/exec`

### 2단계: 웹사이트 설정

1. **script.js 파일 수정**
   ```javascript
   // 60번 줄의 YOUR_GOOGLE_SCRIPT_URL을 복사한 URL로 교체
   const GOOGLE_SCRIPT_URL = '여기에_복사한_URL_붙여넣기';
   ```

2. **GitHub에 Push**
   ```bash
   git add .
   git commit -m "Google Apps Script URL 설정"
   git push origin main
   ```

## 사용 방법

1. 웹사이트에서 폼 작성
2. "무료 컨설팅 신청하기" 클릭
3. **바로 전송 완료!** (로그인 불필요)

## 이메일 수신 확인

- **수신자**: lucas@warmguys.com
- **형식**: HTML 이메일 (깔끔한 디자인)
- **내용**: 모든 폼 필드 + 제출 시간

## 파일 구조
```
warmenergy/
├── index.html                    # 메인 페이지
├── styles.css                    # 스타일
├── script.js                     # 폼 제출 로직 (수정 필요)
└── google-apps-script-code.js    # Google Apps Script 코드 (복사용)
```

## 문제 해결

### 이메일이 전송되지 않을 때
1. Google Apps Script URL이 올바르게 설정되었는지 확인
2. Google Apps Script 배포 시 "모든 사용자" 권한 선택했는지 확인
3. 브라우저 콘솔(F12)에서 에러 메시지 확인

### "설정이 필요합니다" 메시지가 나올 때
- script.js 파일의 60번 줄 GOOGLE_SCRIPT_URL 확인
- `YOUR_GOOGLE_SCRIPT_URL`을 실제 URL로 교체했는지 확인

## 비용
- Google Apps Script: **무료** (월 20,000건)
- GitHub Pages: **무료**
- 총 비용: **₩0**

## 보안
- 이메일 주소가 코드에 하드코딩되어 안전
- 스팸봇이 수집할 수 없는 구조
- Google 인프라 사용으로 안정적