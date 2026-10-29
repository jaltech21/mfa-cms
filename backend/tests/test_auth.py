from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models.client import Client, UserRole
from app.core import security

engine = create_engine("sqlite:///./test_auth.db")
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def create_test_user(db, email: str = "test@mfa.com", password: str = "pass123", role: UserRole = UserRole.CLIENT):
    user = Client(
        email=email,
        password_hash=security.get_password_hash(password),
        first_name="Test",
        last_name="User",
        role=role,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def test_register_and_login():
    response = client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@mfa.com",
            "password": "pass123",
            "first_name": "Test",
            "last_name": "User",
        },
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@mfa.com"

    login_response = client.post(
        "/api/v1/auth/login",
        data={"username": "test@mfa.com", "password": "pass123"},
    )
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()


def test_login_wrong_password():
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "test@mfa.com", "password": "wrongpass"},
    )
    assert response.status_code == 401


def test_forgot_and_reset_password():
    response = client.post(
        "/api/v1/auth/forgot-password",
        json={"email": "test@mfa.com"},
    )
    assert response.status_code == 200
    assert "message" in response.json()

    # Get user to retrieve token
    db = TestingSessionLocal()
    user = db.query(Client).filter(Client.email == "test@mfa.com").first()
    db.close()

    reset_response = client.post(
        "/api/v1/auth/reset-password",
        json={"token": user.reset_token, "new_password": "newpass123"},
    )
    assert reset_response.status_code == 200

    # Login with new password
    login_response = client.post(
        "/api/v1/auth/login",
        data={"username": "test@mfa.com", "password": "newpass123"},
    )
    assert login_response.status_code == 200


def test_change_password_requires_auth():
    response = client.post(
        "/api/v1/auth/change-password",
        json={"current_password": "newpass123", "new_password": "newpass456", "confirm_password": "newpass456"},
    )
    assert response.status_code == 401
