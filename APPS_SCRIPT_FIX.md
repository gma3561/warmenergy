# 🚨 Google Apps Script 권한 설정 수정 방법

## 문제
- 현재 Apps Script가 인증을 요구하고 있어 데이터가 저장되지 않음
- 401 Unauthorized 에러 발생

## 해결 방법

### 1. Google Apps Script 열기
1. https://script.google.com 접속
2. **clover9sms@gmail.com** 계정으로 로그인
3. 프로젝트 찾기 또는 아래 직접 링크 사용:
   - https://script.google.com/home/projects/AKfycbznhjUfImbyyubMfJH1AP4An34HFrfJvBMUQcAgpzkjpg0jMmhgf-3I9vMK_I336XZD/edit

### 2. 배포 설정 수정
1. 오른쪽 상단 **배포** 버튼 클릭
2. **배포 관리** 클릭
3. 현재 배포 옆 **편집** (✏️) 아이콘 클릭
4. 다음 설정 확인:
   - **설명**: 새 버전
   - **웹 앱 실행**: **나**(clover9sms@gmail.com)
   - **액세스 권한**: **⚠️ 모든 사용자** (반드시 이것으로 설정!)
5. **배포** 버튼 클릭

### 3. 중요 설정 확인사항
- **웹 앱 실행**: "나"로 설정 (Apps Script 소유자 계정으로 실행)
- **액세스 권한**: "모든 사용자"로 설정 (인증 없이 접근 가능)

### 4. 테스트
1. 배포 URL 복사
2. 브라우저에서 직접 접속: https://script.google.com/macros/s/AKfycbznhjUfImbyyubMfJH1AP4An34HFrfJvBMUQcAgpzkjpg0jMmhgf-3I9vMK_I336XZD/exec
3. 다음과 같은 JSON이 표시되면 성공:
   ```json
   {
     "status": "ready",
     "message": "전기요금 절감 컨설팅 API가 정상 작동 중입니다.",
     ...
   }
   ```

### 5. 권한이 여전히 안 될 경우
1. **새 배포** 생성:
   - 배포 → 새 배포
   - 유형: 웹 앱
   - 실행: 나
   - 액세스: 모든 사용자
   - 배포 클릭
2. 새 URL을 script.js와 test-google-sheets.html에 업데이트

## 현재 상태
- URL: https://script.google.com/macros/s/AKfycbznhjUfImbyyubMfJH1AP4An34HFrfJvBMUQcAgpzkjpg0jMmhgf-3I9vMK_I336XZD/exec
- 소유자: clover9sms@gmail.com
- 이메일 수신: clover9@warmguys.com
- 스프레드시트: https://docs.google.com/spreadsheets/d/1amaUEYJ2oyS1kn4giI68J2PtPt1o5IPNXBB0NDSmxlc/edit