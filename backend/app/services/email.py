import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from app.core.config import settings


def send_email(to_email: str, subject: str, html_content: str, text_content: str = None) -> bool:
    if not settings.SMTP_HOST or not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        # Email not configured - log only
        return False
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = settings.SMTP_FROM
    msg['To'] = to_email
    
    msg.attach(MIMEText(text_content or subject, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))
    
    try:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        if settings.SMTP_USE_TLS:
            server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Email send failed: {e}")
        return False


def send_password_reset_email(to_email: str, reset_token: str, frontend_url: str = "http://localhost:5173") -> bool:
    reset_link = f"{frontend_url}/login/forgot-password?token={reset_token}"
    subject = "MFA - Password Reset Request"
    text_content = f"Click the following link to reset your password: {reset_link}"
    html_content = f"""
    <html>
      <body>
        <h2>Migration For All (MFA) - Password Reset</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="{reset_link}">{reset_link}</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </body>
    </html>
    """
    return send_email(to_email, subject, html_content, text_content)
