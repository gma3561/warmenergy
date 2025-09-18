# Google Sheets + Apps Script 설정 가이드

## 📋 준비된 스프레드시트
https://docs.google.com/spreadsheets/d/1amaUEYJ2oyS1kn4giI68J2PtPt1o5IPNXBB0NDSmxlc/edit

## 🚀 설정 방법 (5분)

### 1단계: Apps Script 열기
1. 위 스프레드시트 열기
2. 상단 메뉴: **확장 프로그램** → **Apps Script**
3. 새 창에서 Apps Script 편집기가 열림

### 2단계: 코드 복사
1. 기존 코드 모두 삭제 (function myFunction() {} 삭제)
2. `google-apps-script-final.js` 파일의 모든 코드 복사
3. Apps Script 편집기에 붙여넣기
4. **Ctrl+S** (또는 Cmd+S) 저장

### 3단계: 웹 앱으로 배포
1. 상단 **배포** → **새 배포**
2. 톱니바퀴 ⚙️ → **웹 앱** 선택
3. 설정:
   - 설명: "전기요금 컨설팅 폼"
   - 실행: **나**
   - 액세스 권한: **모든 사용자** (중요!)
4. **배포** 클릭
5. 권한 승인:
   - "액세스 승인" 클릭
   - Google 계정 선택
   - "고급" 클릭 → "안전하지 않은 페이지로 이동"
   - 모든 권한 허용

### 4단계: URL 복사
배포 완료 후 나타나는 URL 복사
예시: `https://script.google.com/macros/s/AKfycbxxxxx/exec`

## 📝 웹사이트 수정

`script.js` 파일 수정:
```javascript
// 약 60번 줄
const GOOGLE_SCRIPT_URL = '여기에_복사한_URL_붙여넣기';
```

## ✅ 테스트
1. 웹사이트에서 폼 작성
2. "무료 컨설팅 신청하기" 클릭
3. 확인:
   - Google Sheets에 데이터 추가됨
   - lucas@warmguys.com으로 이메일 전송됨

## 📊 데이터 확인
- 실시간으로 Google Sheets에서 확인 가능
- 엑셀로 다운로드 가능 (파일 → 다운로드 → .xlsx)

## 🔧 문제 해결
- "권한이 필요합니다" 오류: 배포 시 "모든 사용자" 선택 확인
- 이메일이 안 옴: 스팸 폴더 확인
- 데이터가 안 들어옴: Apps Script 로그 확인 (보기 → 로그)