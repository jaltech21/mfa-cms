from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    APP_NAME: str = "MFA Client Management System"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"
    
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    TREXO_API_KEY: str = ""
    TREXO_WEBHOOK_SECRET: str = ""
    
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = "noreply@mfa.com"
    SMTP_USE_TLS: bool = True
    
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    IP_HEADER: str = "X-Forwarded-For"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
