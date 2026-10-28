from sqlalchemy import Column, String, Boolean, Date, ForeignKey, Text, Integer
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class MarriageProcessDetails(BaseModel):
    __tablename__ = "marriage_process_details"
    
    program_id = Column(Integer, ForeignKey("programs.id"), nullable=False, unique=True)
    
    spouse_name = Column(String)
    spouse_nationality = Column(String)
    marriage_date = Column(Date)
    marriage_certificate_no = Column(String)
    marriage_location = Column(String)
    
    documents_submitted = Column(Text)
    checklist_status = Column(Text)
    notes = Column(Text)
    
    program = relationship("Program", back_populates="marriage_details")


class BusinessProcessDetails(BaseModel):
    __tablename__ = "business_process_details"
    
    program_id = Column(Integer, ForeignKey("programs.id"), nullable=False, unique=True)
    
    business_name = Column(String)
    business_type = Column(String)
    registration_number = Column(String)
    business_address = Column(String)
    investment_amount = Column(String)
    
    documents_submitted = Column(Text)
    checklist_status = Column(Text)
    notes = Column(Text)
    
    program = relationship("Program", back_populates="business_details")


class MinistryEnvoyProcessDetails(BaseModel):
    __tablename__ = "ministry_envoy_process_details"
    
    program_id = Column(Integer, ForeignKey("programs.id"), nullable=False, unique=True)
    
    ministry_name = Column(String)
    envoy_title = Column(String)
    delegation_size = Column(String)
    purpose_of_visit = Column(Text)
    official_invitation_ref = Column(String)
    
    documents_submitted = Column(Text)
    checklist_status = Column(Text)
    notes = Column(Text)
    
    program = relationship("Program", back_populates="envoy_details")


class MedicalProcessDetails(BaseModel):
    __tablename__ = "medical_process_details"
    
    program_id = Column(Integer, ForeignKey("programs.id"), nullable=False, unique=True)
    
    medical_facility = Column(String)
    treatment_type = Column(String)
    referring_doctor = Column(String)
    medical_report_ref = Column(String)
    treatment_duration = Column(String)
    
    documents_submitted = Column(Text)
    checklist_status = Column(Text)
    notes = Column(Text)
    
    program = relationship("Program", back_populates="medical_details")
