// Vercel Serverless Function - 완전 무료
// /api/send-email 엔드포인트로 자동 배포됨

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // SendGrid API (무료 - 일 100건)
    // 또는 Resend API (무료 - 일 100건)
    // 환경변수로 API 키 설정 필요

    // 옵션 1: SendGrid 사용 시
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'lucas@warmguys.com',
      from: 'noreply@warmenergy.com', // SendGrid에 인증된 이메일
      subject: `[전기요금 절감 컨설팅] ${data.company} - ${data.name}님 문의`,
      text: `
회사명: ${data.company}
담당자명: ${data.name}
직급: ${data.position || '미입력'}
연락처: ${data.phone}
이메일: ${data.email || '미입력'}
사업장 주소: ${data.location}
월 평균 전기요금: ${data.electricBill || '미입력'}

문의사항:
${data.message || '없음'}

접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      `,
      html: `
        <h2>전기요금 절감 컨설팅 문의</h2>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr><td><strong>회사명</strong></td><td>${data.company}</td></tr>
          <tr><td><strong>담당자명</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>직급</strong></td><td>${data.position || '미입력'}</td></tr>
          <tr><td><strong>연락처</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>이메일</strong></td><td>${data.email || '미입력'}</td></tr>
          <tr><td><strong>사업장 주소</strong></td><td>${data.location}</td></tr>
          <tr><td><strong>월 평균 전기요금</strong></td><td>${data.electricBill || '미입력'}</td></tr>
        </table>
        <h3>문의사항</h3>
        <p>${(data.message || '없음').replace(/\n/g, '<br>')}</p>
        <hr>
        <small>접수 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</small>
      `
    };

    await sgMail.send(msg);

    return res.status(200).json({
      status: 'success',
      message: '문의가 성공적으로 전송되었습니다.'
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      status: 'error',
      message: '전송 중 오류가 발생했습니다.'
    });
  }
}