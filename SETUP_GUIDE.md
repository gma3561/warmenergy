# Vercel 이메일 설정 가이드

## 현재 상태
✅ Vercel 배포 완료
✅ 웹사이트 작동 중
⚠️ 이메일 전송을 위한 SendGrid 설정 필요

## SendGrid 설정 방법 (무료)

### 1. SendGrid 가입
1. https://sendgrid.com 접속
2. "Start for Free" 클릭
3. 계정 생성 (무료)

### 2. API Key 생성
1. 로그인 후 Settings → API Keys
2. "Create API Key" 클릭
3. API Key Name: "warmenergy"
4. API Key Permissions: "Full Access"
5. 생성된 API Key 복사 (한 번만 표시됨!)

### 3. Sender 인증
1. Settings → Sender Authentication
2. "Single Sender Verification" 선택
3. 이메일 주소 입력 (예: noreply@warmguys.com)
4. 인증 이메일 확인

### 4. Vercel 환경변수 설정
1. https://vercel.com/dashboard 로그인
2. warmenergy 프로젝트 선택
3. Settings → Environment Variables
4. 다음 변수 추가:
   - `SENDGRID_API_KEY`: [복사한 API Key]
   - `SENDER_EMAIL`: [인증한 이메일 주소]

### 5. 재배포
1. Deployments 탭
2. 최신 deployment 옆 "..." 클릭
3. "Redeploy" 선택

## 테스트
1. 웹사이트에서 폼 작성
2. "무료 컨설팅 신청하기" 클릭
3. lucas@warmguys.com으로 이메일 도착 확인

## 대안: SendGrid 없이 테스트
현재 SendGrid 설정 없이도 폼 제출은 가능합니다.
Vercel Functions 로그에서 제출된 데이터를 확인할 수 있습니다:
1. Vercel Dashboard → Functions 탭
2. send-email 함수 클릭
3. Logs에서 제출된 폼 데이터 확인

## 문제 해결
- 이메일이 오지 않을 때: SendGrid API Key와 Sender Email 확인
- 폼 제출 오류: Vercel Functions 로그 확인
- CORS 오류: 브라우저 캐시 삭제 후 재시도