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

// Contact form handler - 직접 이메일 전송
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
        // Vercel 또는 Netlify Function으로 전송
        // Vercel 배포 시: /api/send-email
        // Netlify 배포 시: /.netlify/functions/send-email
        const endpoint = window.location.hostname.includes('vercel')
          ? '/api/send-email'
          : window.location.hostname.includes('netlify')
          ? '/.netlify/functions/send-email'
          : '/api/send-email'; // 기본값

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

      } catch (error) {
        console.error('전송 오류:', error);

        // 오류 발생 시 이메일 클라이언트로 폴백
        if (confirm('전송 중 오류가 발생했습니다.\n\n이메일 클라이언트로 전송하시겠습니까?')) {
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

          const mailtoLink = `mailto:lucas@warmguys.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
          window.location.href = mailtoLink;
        }
      } finally {
        // 버튼 원래 상태로 복구
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});