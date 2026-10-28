# MFA CMS Backend

FastAPI backend for Migration For All (MFA) Client & Casework Management System.

## Setup

1. Create virtual environment
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Configure environment
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run migrations
```bash
alembic upgrade head
```

5. Start server
```bash
uvicorn app.main:app --reload
```

API docs available at http://localhost:8000/docs
