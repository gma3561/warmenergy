# 📧 Apps Script 이메일 설정 업데이트

## 변경 사항
- **이메일 수신자**: `lucas@warmguys.com` → **`clover9@warmguys.com`**
- **Apps Script 소유자**: **`clover9sms@gmail.com`**

## 🔄 업데이트 방법

### 1단계: Apps Script 열기
1. Google Sheets 열기: https://docs.google.com/spreadsheets/d/1amaUEYJ2oyS1kn4giI68J2PtPt1o5IPNXBB0NDSmxlc/edit
2. **확장 프로그램** → **Apps Script**

### 2단계: 코드 수정
73번 줄 근처에서 이메일 주소 변경:

**변경 전:**
```javascript
GmailApp.sendEmail(
  'lucas@warmguys.com',  // 받는 사람
```

**변경 후:**
```javascript
GmailApp.sendEmail(
  'clover9@warmguys.com',  // 받는 사람
```

### 3단계: 저장 및 재배포
1. **Ctrl+S** (또는 Cmd+S) 저장
2. **배포** → **배포 관리**
3. ✏️ 편집 아이콘 클릭
4. **버전**: "새 버전"
5. **설명**: "이메일 주소 변경"
6. **배포** 클릭

### 4단계: 소유권 이전 (선택사항)
`clover9sms@gmail.com` 계정으로 소유권을 이전하려면:

1. Apps Script 프로젝트에서
2. 오른쪽 상단 **공유** 버튼
3. `clover9sms@gmail.com` 추가
4. 권한: **편집자** 또는 **소유자**
5. 전송

## ✅ 확인 사항
- 이메일이 `clover9@warmguys.com`으로 전송되는지 확인
- Google Sheets에 데이터가 정상적으로 저장되는지 확인
- Apps Script 실행 권한이 `clover9sms@gmail.com` 계정에 있는지 확인

## 📝 참고
- URL은 변경되지 않습니다 (동일한 스크립트 ID 유지)
- 기존 데이터는 모두 유지됩니다
- 웹사이트 코드는 이미 업데이트되어 있습니다