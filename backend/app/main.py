from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, webhooks
from app.api.v1.admin import catalog, cohorts, applications, clients, payments
from app.api.v1.client import profile, catalog as client_catalog, programs

app = FastAPI(
    title=settings.APP_NAME,
    description="Migration For All (MFA) - Client & Casework Management System",
    version="1.0.0",
    debug=settings.DEBUG,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(webhooks.router, prefix="/api/v1/webhooks", tags=["webhooks"])
app.include_router(catalog.router, prefix="/api/v1/admin/catalog", tags=["admin-catalog"])
app.include_router(cohorts.router, prefix="/api/v1/admin/cohorts", tags=["admin-cohorts"])
app.include_router(applications.router, prefix="/api/v1/admin/applications", tags=["admin-applications"])
app.include_router(clients.router, prefix="/api/v1/admin/clients", tags=["admin-clients"])
app.include_router(payments.router, prefix="/api/v1/admin/payments", tags=["admin-payments"])
app.include_router(profile.router, prefix="/api/v1/client/profile", tags=["client-profile"])
app.include_router(client_catalog.router, prefix="/api/v1/client/catalog", tags=["client-catalog"])
app.include_router(programs.router, prefix="/api/v1/client/programs", tags=["client-programs"])


@app.get("/")
def root():
    return {"message": "MFA CMS API", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}
