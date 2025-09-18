// Google Apps Script 코드 (완전 무료, 로그인 불필요)
//
// 설정 방법:
// 1. https://script.google.com 접속
// 2. 새 프로젝트 생성
// 3. 아래 코드 전체 복사/붙여넣기
// 4. 배포 → 새 배포 → 유형: 웹 앱
// 5. 설정:
//    - 실행: 나
//    - 액세스 권한: 모든 사용자
// 6. 배포 후 받은 URL을 script.js의 GOOGLE_SCRIPT_URL에 입력

function doPost(e) {
  try {
    // CORS 헤더 설정
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 받는 사람 이메일 (여기에 lucas@warmguys.com 설정)
    const recipient = 'lucas@warmguys.com';

    // 이메일 제목
    const subject = `[전기요금 절감 컨설팅] ${data.company} - ${data.name}님 문의`;

    // 이메일 본문 (HTML 형식)
    const htmlBody = `
      <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0066ff; border-bottom: 2px solid #0066ff; padding-bottom: 10px;">
          📋 전기요금 절감 컨설팅 문의
        </h2>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">회사 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 30%;"><strong>회사명:</strong></td>
              <td style="padding: 8px 0;">${data.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>담당자명:</strong></td>
              <td style="padding: 8px 0;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>직급:</strong></td>
              <td style="padding: 8px 0;">${data.position || '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>연락처:</strong></td>
              <td style="padding: 8px 0;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>이메일:</strong></td>
              <td style="padding: 8px 0;">${data.email || '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>사업장 주소:</strong></td>
              <td style="padding: 8px 0;">${data.location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>월 평균 전기요금:</strong></td>
              <td style="padding: 8px 0;">${data.electricBill || '미입력'}</td>
            </tr>
          </table>
        </div>

        <div style="background: #fff; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">문의사항</h3>
          <p style="line-height: 1.8; color: #555;">
            ${data.message || '문의사항 없음'}
          </p>
        </div>

        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066ff;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}<br>
            <strong>접수 경로:</strong> 웹사이트 폼 자동 제출
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <p style="color: #999; font-size: 12px;">
            이 이메일은 warmenergy 웹사이트의 문의 폼을 통해 자동으로 발송되었습니다.
          </p>
        </div>
      </div>
    `;

    // 일반 텍스트 본문 (HTML을 지원하지 않는 경우)
    const textBody = `
전기요금 절감 컨설팅 문의

[회사 정보]
회사명: ${data.company}
담당자명: ${data.name}
직급: ${data.position || '미입력'}
연락처: ${data.phone}
이메일: ${data.email || '미입력'}
사업장 주소: ${data.location}
월 평균 전기요금: ${data.electricBill || '미입력'}

[문의사항]
${data.message || '문의사항 없음'}

접수 시간: ${new Date().toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}
    `.trim();

    // 이메일 전송
    GmailApp.sendEmail(
      recipient,
      subject,
      textBody,
      {
        htmlBody: htmlBody,
        name: '전기요금 절감 컨설팅 시스템',
        replyTo: data.email || 'noreply@warmenergy.com'
      }
    );

    // 성공 응답
    return output.setContent(JSON.stringify({
      status: 'success',
      message: '문의가 성공적으로 전송되었습니다.'
    }));

  } catch (error) {
    // 에러 응답
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ready',
    message: 'Email API is active and ready to receive POST requests',
    recipient: 'lucas@warmguys.com'
  })).setMimeType(ContentService.MimeType.JSON);
}