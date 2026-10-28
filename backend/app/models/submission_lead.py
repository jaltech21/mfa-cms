from sqlalchemy import Column, String, Enum
from app.models.base import BaseModel
import enum


class ReferralType(str, enum.Enum):
    MP = "mp"
    PERMANENT_SECRETARY = "permanent_secretary"
    PARLIAMENTARY_STAFF = "parliamentary_staff"
    OTHER = "other"


class SubmissionLead(BaseModel):
    __tablename__ = "submission_leads"
    
    referral_type = Column(Enum(ReferralType), nullable=False)
    full_name = Column(String, nullable=False)
    title = Column(String)
    organization = Column(String)
    contact_email = Column(String)
    contact_phone = Column(String)
    notes = Column(String)
