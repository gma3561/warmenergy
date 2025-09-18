// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;
    
    // Toggle current item
    button.setAttribute('aria-expanded', !expanded);
    answer.hidden = expanded;
    
    // Close other items
    document.querySelectorAll('.faq-question').forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.setAttribute('aria-expanded', 'false');
        otherButton.nextElementSibling.hidden = true;
      }
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply initial styles and observe sections
document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// Google Apps Script URL - 배포 후 여기에 URL 입력
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznhjUfImbyyubMfJH1AP4An34HFrfJvBMUQcAgpzkjpg0jMmhgf-3I9vMK_I336XZD/exec';

// Contact form handler - Google Sheets + 이메일 전송
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      // 버튼 상태 변경
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '전송 중...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = {
        company: this.company.value,
        name: this.name.value,
        position: this.position.value || '',
        phone: this.phone.value,
        email: this.email.value || '',
        location: this.location.value,
        electricBill: this['electric-bill'].value || '',
        message: this.message.value || ''
      };

      try {
        // Google Apps Script로 전송 (우선)
        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_URL') {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // CORS 우회
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });

          // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
          alert('✅ 문의가 성공적으로 접수되었습니다!\n\n빠른 시일 내에 연락드리겠습니다.');
          this.reset();

        }
        // Vercel/Netlify 폴백
        else if (window.location.hostname.includes('vercel') || window.location.hostname.includes('netlify')) {
          const endpoint = window.location.hostname.includes('vercel')
            ? '/api/send-email'
            : '/.netlify/functions/send-email';

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });

          if (response.ok) {
            alert('✅ 문의가 성공적으로 전송되었습니다!\n\n빠른 시일 내에 연락드리겠습니다.');
            this.reset();
          } else {
            throw new Error('전송 실패');
          }

        }
        // Google Apps Script 설정 안내
        else {
          if (confirm('⚠️ Google Apps Script 설정이 필요합니다.\n\n설정 안내를 확인하시겠습니까?')) {
            alert(
              '📋 설정 방법:\n\n' +
              '1. Google Sheets 열기 (README 참조)\n' +
              '2. 확장 프로그램 → Apps Script\n' +
              '3. google-apps-script-final.js 코드 붙여넣기\n' +
              '4. 배포 → 웹 앱으로 배포\n' +
              '5. URL을 script.js 59번 줄에 입력\n\n' +
              '또는 이메일로 직접 전송하려면 "확인"을 누르세요.'
            );
          }

          // 이메일 클라이언트로 폴백
          const emailSubject = `[전기요금 절감 컨설팅] ${formData.company} - ${formData.name}님 문의`;
          const emailBody = `
회사명: ${formData.company}
담당자명: ${formData.name}
직급: ${formData.position}
연락처: ${formData.phone}
이메일: ${formData.email}
사업장 주소: ${formData.location}
월 평균 전기요금: ${formData.electricBill}

문의사항:
${formData.message}
`.trim();

          const mailtoLink = `mailto:clover9@warmguys.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
          window.location.href = mailtoLink;
        }

      } catch (error) {
        console.error('전송 오류:', error);
        alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');

      } finally {
        // 버튼 원래 상태로 복구
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});