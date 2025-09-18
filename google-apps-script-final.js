// Google Apps Script 코드 - Google Sheets에 데이터 저장 + 이메일 전송
//
// 설정 방법:
// 1. Google Sheets 생성 (https://sheets.google.com)
// 2. 확장 프로그램 → Apps Script 클릭
// 3. 아래 코드 전체 복사/붙여넣기
// 4. 배포 → 새 배포 → 웹 앱
// 5. 액세스 권한: "모든 사용자"로 설정

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
이 이메일은 warmenergy 웹사이트의 문의 폼을 통해 자동으로 발송되었습니다.
    `.trim();

    // HTML 형식 이메일
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0066ff, #00d4ff); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border: 1px solid #e5e5e5; }
    .section { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .section h3 { color: #0066ff; margin-bottom: 10px; border-bottom: 2px solid #0066ff; padding-bottom: 5px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px; border-bottom: 1px solid #eee; }
    td:first-child { font-weight: bold; color: #666; width: 35%; }
    .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    .btn { display: inline-block; padding: 10px 30px; background: #0066ff; color: white; text-decoration: none; border-radius: 25px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🔔 새로운 전기요금 절감 컨설팅 문의</h2>
    </div>

    <div class="content">
      <div class="section">
        <h3>📋 회사 정보</h3>
        <table>
          <tr><td>회사명</td><td>${data.company}</td></tr>
          <tr><td>담당자명</td><td>${data.name}</td></tr>
          <tr><td>직급</td><td>${data.position || '미입력'}</td></tr>
          <tr><td>연락처</td><td><strong>${data.phone}</strong></td></tr>
          <tr><td>이메일</td><td>${data.email || '미입력'}</td></tr>
          <tr><td>사업장 주소</td><td>${data.location}</td></tr>
          <tr><td>월 평균 전기요금</td><td><strong>${data.electricBill || '미입력'}</strong></td></tr>
        </table>
      </div>

      <div class="section">
        <h3>💬 문의사항</h3>
        <p>${(data.message || '문의사항 없음').replace(/\n/g, '<br>')}</p>
      </div>

      <div class="section" style="background: #f0f8ff;">
        <h3>📊 관리 정보</h3>
        <table>
          <tr><td>접수 시간</td><td>${kstTime}</td></tr>
          <tr><td>데이터 저장</td><td><a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}" target="_blank">스프레드시트 열기</a></td></tr>
        </table>
      </div>
    </div>

    <div class="footer">
      <p>이 이메일은 warmenergy 웹사이트의 문의 폼을 통해 자동으로 발송되었습니다.</p>
    </div>
  </div>
</body>
</html>
    `;

    // 이메일 전송 (받는 사람)
    const recipient = 'clover9@warmguys.com';

    // Gmail로 이메일 전송
    GmailApp.sendEmail(
      recipient,
      emailSubject,
      emailBody,
      {
        htmlBody: htmlBody,
        name: '전기요금 절감 컨설팅 시스템',
        replyTo: data.email || 'noreply@warmenergy.com'
      }
    );

    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '문의가 성공적으로 접수되었습니다.',
        'row': sheet.getLastRow(),
        'sheet_url': SpreadsheetApp.getActiveSpreadsheet().getUrl()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 로그
    console.error('Error:', error.toString());

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
      'message': '전기요금 절감 컨설팅 API가 정상 작동 중입니다.',
      'sheet_name': sheet.getName(),
      'total_submissions': Math.max(0, data.length - 1), // 헤더 제외
      'sheet_url': sheet.getUrl(),
      'recipient': 'lucas@warmguys.com'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}