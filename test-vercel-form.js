// Vercel 폼 테스트 스크립트

async function testFormSubmission() {
  const testData = {
    company: '테스트 회사',
    name: '김철수',
    position: '과장',
    phone: '010-1234-5678',
    email: 'test@example.com',
    location: '서울시 강남구 테헤란로 123',
    electricBill: '500만원',
    message: '전기요금 절감 컨설팅이 필요합니다.'
  };

  console.log('📤 폼 데이터 전송 중...');
  console.log('Endpoint: https://warmenergy.vercel.app/api/send-email');
  console.log('Data:', testData);

  try {
    const response = await fetch('https://warmenergy.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ 성공:', result);
      console.log('\n📧 이메일 전송 상태:');
      if (result.note) {
        console.log('⚠️ ', result.note);
        console.log('\n💡 이메일을 실제로 받으려면:');
        console.log('1. SendGrid 무료 가입 (https://sendgrid.com)');
        console.log('2. API Key 생성');
        console.log('3. Vercel 환경변수 설정:');
        console.log('   - SENDGRID_API_KEY: [API 키]');
        console.log('   - SENDER_EMAIL: [인증된 이메일]');
      } else {
        console.log('✅ lucas@warmguys.com으로 이메일 전송 완료!');
      }
    } else {
      console.log('❌ 오류:', result);
    }
  } catch (error) {
    console.error('❌ 네트워크 오류:', error);
  }
}

// 테스트 실행
testFormSubmission();