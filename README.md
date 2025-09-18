# 전기요금 절감 컨설팅 웹사이트

## 🚀 완전 무료 이메일 전송 시스템 (Vercel 또는 Netlify)

**로그인 불필요! 버튼 클릭만으로 바로 이메일 전송!**

### 두 가지 무료 옵션

#### 옵션 1: Vercel (추천)
- ✅ **100% 무료**
- ✅ 버튼 클릭 즉시 lucas@warmguys.com으로 전송
- ✅ 서버리스 함수 자동 배포
- ✅ SendGrid 무료 플랜 (일 100건)

#### 옵션 2: Netlify
- ✅ **100% 무료**
- ✅ Netlify Forms 자동 이메일
- ✅ 월 100 폼 제출 무료

## 설정 방법

### Vercel 배포 (추천 - 5분)

1. **Vercel 가입** (무료)
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Import Git Repository" 클릭
   - GitHub repository 선택 (gma3561/warmenergy)

3. **SendGrid 설정** (선택사항)
   - https://sendgrid.com 무료 가입
   - API Key 생성
   - Vercel 환경변수 추가:
     - `SENDGRID_API_KEY`: API 키

4. **배포**
   - "Deploy" 클릭
   - 자동으로 배포 완료!

### 또는 Netlify 배포

1. **Netlify 가입** (무료)
   - https://netlify.com 접속
   - GitHub 계정으로 로그인

2. **New site from Git**
   - GitHub repository 연결
   - 자동 배포

3. **Forms 설정**
   - Settings → Forms → Enable
   - Email notifications 설정

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