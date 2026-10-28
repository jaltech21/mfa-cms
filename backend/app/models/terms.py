from sqlalchemy import Column, String, Boolean, Integer
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class TermsAndConditions(BaseModel):
    __tablename__ = "terms_and_conditions"
    
    version = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)
    created_by_id = Column(Integer)
    
    consent_logs = relationship("ClientConsentLog", back_populates="terms_and_conditions")
