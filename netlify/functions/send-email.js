// Netlify Function - 완전 무료 이메일 전송
// Netlify에서 월 125,000 요청까지 무료!

exports.handler = async (event, context) => {
  // CORS 허용
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  // POST 요청만 처리
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // 폼 데이터 파싱
    const data = JSON.parse(event.body);

    // 이메일 내용 생성
    const emailContent = `
새로운 전기요금 절감 컨설팅 문의

━━━━━━━━━━━━━━━━━━━━━━
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
━━━━━━━━━━━━━━━━━━━━━━
`;

    // 여기서 실제 이메일 전송
    // Netlify Forms 자동 이메일 전송 활용
    const formData = new URLSearchParams();
    formData.append('form-name', 'consultation');
    formData.append('company', data.company);
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email || '');
    formData.append('message', emailContent);

    // Netlify Forms API로 제출
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    // 성공 응답
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        message: '문의가 성공적으로 전송되었습니다.'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        message: '전송 중 오류가 발생했습니다.'
      })
    };
  }
};