from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.client import Client, UserRole
from app.models.visa_catalog import VisaProcessingCatalog, ProgramType
from app.models.terms import TermsAndConditions
from app.core.security import get_password_hash
from datetime import date


def seed():
    db = SessionLocal()
    try:
        # Create super admin
        admin = db.query(Client).filter(Client.email == "admin@mfa.com").first()
        if not admin:
            admin = Client(
                email="admin@mfa.com",
                password_hash=get_password_hash("admin123"),
                first_name="System",
                last_name="Admin",
                role=UserRole.SUPER_ADMIN,
                is_active=True,
                is_verified=True,
            )
            db.add(admin)
            print("Created super admin: admin@mfa.com / admin123")
        
        # Create catalog items
        if db.query(VisaProcessingCatalog).count() == 0:
            catalog_items = [
                VisaProcessingCatalog(
                    program_type=ProgramType.MARRIAGE,
                    name="Marriage Migration Visa",
                    description="Visa processing for marriage-based migration",
                    standard_price=2500.00,
                    currency="USD",
                    requirements="Marriage certificate, proof of relationship, etc.",
                    is_active=True,
                ),
                VisaProcessingCatalog(
                    program_type=ProgramType.BUSINESS,
                    name="Business Migration Visa",
                    description="Visa processing for business/investment migration",
                    standard_price=5000.00,
                    currency="USD",
                    requirements="Business registration, investment proof, etc.",
                    is_active=True,
                ),
                VisaProcessingCatalog(
                    program_type=ProgramType.MINISTRY_ENVOY,
                    name="Ministry Envoy Visa",
                    description="Visa processing for ministry/envoy delegations",
                    standard_price=1500.00,
                    currency="USD",
                    requirements="Official invitation, delegation list, etc.",
                    is_active=True,
                ),
                VisaProcessingCatalog(
                    program_type=ProgramType.MEDICAL,
                    name="Medical Migration Visa",
                    description="Visa processing for medical treatment",
                    standard_price=2000.00,
                    currency="USD",
                    requirements="Medical report, hospital appointment, etc.",
                    is_active=True,
                ),
            ]
            db.add_all(catalog_items)
            print("Created catalog items")
        
        # Create active terms and conditions
        terms = db.query(TermsAndConditions).filter(TermsAndConditions.is_active == True).first()
        if not terms:
            terms = TermsAndConditions(
                version="1.0",
                title="Terms and Conditions",
                content="By using this service, you agree to the terms and conditions of Migration For All (MFA). All information provided must be accurate and truthful. MFA reserves the right to process applications in accordance with applicable laws and regulations.",
                is_active=True,
            )
            db.add(terms)
            print("Created active terms and conditions")
        
        db.commit()
        print("Seeding completed!")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed()
