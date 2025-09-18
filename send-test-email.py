#!/usr/bin/env python3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# 이메일 설정
sender_email = "noreply@warmenergy.test"  # 보내는 사람 (가상)
receiver_email = "lucas@warmguys.com"     # 받는 사람
subject = "[문의] 테스트 회사 - 김철수님"

# 이메일 본문
body = """
📋 전기요금 절감 컨설팅 문의가 접수되었습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
회사 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
회사명: 테스트 회사
담당자명: 김철수
직급: 과장
연락처: 010-9876-5432
이메일: test@example.com
사업장 주소: 서울시 강남구 테헤란로 123
월 평균 전기요금: 500만원

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
문의사항
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
전기요금이 매달 500만원 정도 나오는데, 절감 방안이 있는지 궁금합니다.
특히 계절별로 요금 차이가 크게 나는데, 이런 부분도 개선이 가능한지 알고 싶습니다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
접수 정보
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
접수번호: #1
GitHub Issue: https://github.com/gma3561/warmenergy/issues/1
접수 시간: {timestamp}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
이 이메일은 웹사이트 폼을 통해 자동으로 생성되었습니다.
답변은 GitHub Issue 페이지에서 직접 작성하실 수 있습니다.
""".format(timestamp=datetime.now().strftime("%Y년 %m월 %d일 %H:%M:%S"))

# 이메일 메시지 생성
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject
msg.attach(MIMEText(body, 'plain', 'utf-8'))

# 이메일 내용 출력 (실제 전송 대신 시뮬레이션)
print("=" * 60)
print("📧 이메일 시뮬레이션")
print("=" * 60)
print(f"받는 사람: {receiver_email}")
print(f"보내는 사람: {sender_email}")
print(f"제목: {subject}")
print("-" * 60)
print("본문:")
print(body)
print("=" * 60)
print("\n✅ 위 내용이 lucas@warmguys.com으로 전송될 예정입니다.")
print("\n실제 이메일 전송을 위해서는:")
print("1. GitHub Repository Settings → Secrets → Actions")
print("2. EMAIL_USERNAME과 EMAIL_PASSWORD 설정")
print("3. GitHub Issue 생성 시 자동으로 이메일 발송")