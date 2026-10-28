from sqlalchemy import Column, String, Integer, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class ClientConsentLog(BaseModel):
    __tablename__ = "client_consent_logs"
    
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    terms_and_conditions_id = Column(Integer, ForeignKey("terms_and_conditions.id"), nullable=False)
    program_id = Column(Integer, ForeignKey("programs.id"))
    
    signature_data = Column(Text)  # Base64 canvas signature
    passport_verification = Column(String)  # Passport number used for verification
    ip_address = Column(String)
    user_agent = Column(String)
    
    client = relationship("Client", back_populates="consent_logs")
    terms_and_conditions = relationship("TermsAndConditions", back_populates="consent_logs")
    program = relationship("Program")
