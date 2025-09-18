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

// Contact form handler - GitHub Issues를 통한 무료 폼 제출
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
        position: this.position.value || '미입력',
        phone: this.phone.value,
        email: this.email.value || '미입력',
        location: this.location.value,
        electricBill: this['electric-bill'].value || '미입력',
        message: this.message.value || '없음'
      };

      // GitHub repository 설정
      const GITHUB_USERNAME = 'gma3561'; // GitHub 사용자명
      const GITHUB_REPO = 'warmenergy'; // 저장소 이름

      // Issue 제목과 본문 생성
      const issueTitle = `[문의] ${formData.company} - ${formData.name}님`;
      const issueBody = `
## 📋 전기요금 절감 컨설팅 문의

**회사명:** ${formData.company}
**담당자명:** ${formData.name}
**직급:** ${formData.position}
**연락처:** ${formData.phone}
**이메일:** ${formData.email}
**사업장 주소:** ${formData.location}
**월 평균 전기요금:** ${formData.electricBill}

### 문의사항
${formData.message}

---
*제출 시간: ${new Date().toLocaleString('ko-KR')}*
`;

      // GitHub Issue 페이지 URL 생성 (라벨 포함)
      const githubIssueUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/issues/new?` +
        `title=${encodeURIComponent(issueTitle)}` +
        `&body=${encodeURIComponent(issueBody)}` +
        `&labels=form-submission,consultation`;

      // 방법 1: GitHub Issue 페이지로 이동 (로그인 필요)
      const useGithub = confirm(
        '문의를 제출하시겠습니까?\n\n' +
        '확인: GitHub를 통해 제출 (GitHub 계정 필요)\n' +
        '취소: 이메일 클라이언트로 전송'
      );

      if (useGithub) {
        // GitHub Issue 페이지를 새 창으로 열기
        window.open(githubIssueUrl, '_blank');

        alert(
          '✅ GitHub 페이지가 열렸습니다.\n\n' +
          '1. GitHub에 로그인하세요 (계정이 없으면 무료 가입)\n' +
          '2. "Submit new issue" 버튼을 클릭하세요\n' +
          '3. 제출 완료되면 자동으로 처리됩니다'
        );

        // 폼 초기화
        this.reset();
      } else {
        // 방법 2: 이메일 클라이언트로 폴백
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

        alert('이메일 클라이언트가 열렸습니다. 이메일을 전송해주세요.');

        // 폼 초기화
        this.reset();
      }

      // 버튼 원래 상태로 복구
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  }
});