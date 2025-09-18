# 📋 Google Sheets + Apps Script 완전 가이드

## 1️⃣ Google Sheets 생성 (1분)

### 옵션 A: 기존 시트 사용
이미 만드신 시트 사용: https://docs.google.com/spreadsheets/d/1amaUEYJ2oyS1kn4giI68J2PtPt1o5IPNXBB0NDSmxlc/edit

### 옵션 B: 새 시트 생성
1. https://sheets.google.com 접속
2. "+" 버튼 클릭 (새 스프레드시트)
3. 시트 이름: "전기요금 컨설팅 문의"

## 2️⃣ Apps Script 설정 (3분)

### 1. Apps Script 열기
![Step 1](https://i.imgur.com/step1.png)
- 스프레드시트 상단 메뉴
- **확장 프로그램** → **Apps Script**

### 2. 코드 붙여넣기
```javascript
function doPost(e) {
  try {
    // 현재 스프레드시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 첫 번째 행이 비어있으면 헤더 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '접수시간',
        '회사명',
        '담당자명',
        '직급',
        '연락처',
        '이메일',
        '사업장 주소',
        '월 평균 전기요금',
        '문의사항'
      ]);
    }

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 현재 시간 (한국 시간)
    const now = new Date();
    const kstTime = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    // 스프레드시트에 데이터 추가
    sheet.appendRow([
      kstTime,
      data.company,
      data.name,
      data.position || '',
      data.phone,
      data.email || '',
      data.location,
      data.electricBill || '',
      data.message || ''
    ]);

    // 이메일 전송
    const emailSubject = `[전기요금 절감 컨설팅] ${data.company} - ${data.name}님 문의`;

    const emailBody = `
새로운 전기요금 절감 컨설팅 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 회사 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
회사명: ${data.company}
담당자명: ${data.name}
직급: ${data.position || '미입력'}
연락처: ${data.phone}
이메일: ${data.email || '미입력'}
사업장 주소: ${data.location}
월 평균 전기요금: ${data.electricBill || '미입력'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 문의사항
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message || '문의사항 없음'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 데이터 확인
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
접수 시간: ${kstTime}
스프레드시트: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // 이메일 전송
    GmailApp.sendEmail(
      'lucas@warmguys.com',  // 받는 사람
      emailSubject,          // 제목
      emailBody,             // 본문
      {
        name: '전기요금 절감 컨설팅 시스템',
        replyTo: data.email || 'noreply@warmenergy.com'
      }
    );

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '문의가 성공적으로 접수되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': '처리 중 오류가 발생했습니다.',
        'error': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const data = sheet.getActiveSheet().getDataRange().getValues();

  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'ready',
      'message': 'API가 정상 작동 중입니다.',
      'total_submissions': Math.max(0, data.length - 1),
      'sheet_url': sheet.getUrl()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 3. 저장
- **Ctrl+S** (Windows) 또는 **Cmd+S** (Mac)
- 또는 💾 아이콘 클릭

## 3️⃣ 웹 앱 배포 (2분)

### 1. 배포 시작
- 오른쪽 상단 **배포** 버튼
- **새 배포** 클릭

### 2. 배포 유형 선택
- 톱니바퀴 ⚙️ 클릭
- **웹 앱** 선택

### 3. 배포 설정
| 항목 | 설정값 |
|------|--------|
| 설명 | 전기요금 컨설팅 폼 API |
| 다음 사용자 인증 실행 | **나** |
| 액세스 권한이 있는 사용자 | **모든 사용자** ⚠️ |

### 4. 권한 승인
1. **액세스 승인** 클릭
2. Google 계정 선택
3. "확인되지 않은 앱" 경고 시:
   - **고급** 클릭
   - **안전하지 않은 페이지로 이동** 클릭
4. **허용** 클릭

### 5. URL 복사
```
https://script.google.com/macros/s/AKfycb.../exec
```
⚠️ **이 URL을 꼭 복사해두세요!**

## 4️⃣ 웹사이트 연결 (1분)

### 1. script.js 수정
```javascript
// 59번 줄 수정
const GOOGLE_SCRIPT_URL = '복사한_URL_여기에_붙여넣기';
```

### 2. Git Push
```bash
git add script.js
git commit -m "Google Apps Script URL 설정"
git push origin main
```

## 5️⃣ 테스트

### 웹사이트에서 테스트
1. https://warmenergy.vercel.app 접속
2. 폼 작성 후 제출
3. 확인:
   - ✅ Google Sheets에 데이터 추가
   - ✅ lucas@warmguys.com으로 이메일 도착

### API 직접 테스트
브라우저에서 배포 URL 접속:
```
https://script.google.com/macros/s/AKfycb.../exec
```
"API가 정상 작동 중입니다" 메시지 확인

## ❓ 자주 묻는 질문

### Q: "권한이 필요합니다" 오류
A: 배포 시 "모든 사용자" 선택했는지 확인

### Q: 이메일이 안 와요
A: 스팸 폴더 확인, Gmail 계정 로그인 상태 확인

### Q: 데이터가 안 들어가요
A: Apps Script에서 보기 → 실행 기록 확인

## 📞 도움이 필요하시면
각 단계 스크린샷이 필요하거나 오류가 발생하면 알려주세요!