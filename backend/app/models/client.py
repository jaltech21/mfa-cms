from sqlalchemy import Column, String, Boolean, Date, Enum, ForeignKey, Integer, DateTime
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class UserRole(str, enum.Enum):
    SUPER_ADMIN = "super_admin"
    OPERATIONS_MANAGER = "operations_manager"
    GENERAL_STAFF = "general_staff"
    CLIENT = "client"


class Client(BaseModel):
    __tablename__ = "clients"
    
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CLIENT, nullable=False)
    
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String)
    date_of_birth = Column(Date)
    nationality = Column(String)
    passport_number = Column(String)
    
    address_line1 = Column(String)
    address_line2 = Column(String)
    city = Column(String)
    country = Column(String)
    
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    reset_token = Column(String, nullable=True)
    reset_token_expires = Column(DateTime, nullable=True)
    
    submission_lead_id = Column(Integer, ForeignKey("submission_leads.id"))
    submission_lead = relationship("SubmissionLead")
    
    programs = relationship("Program", back_populates="client", foreign_keys="Program.client_id")
    consent_logs = relationship("ClientConsentLog", back_populates="client")
    payments = relationship("Payment", back_populates="client", foreign_keys="Payment.client_id")
