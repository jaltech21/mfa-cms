from sqlalchemy import Column, String, Boolean, Numeric, Date, ForeignKey, Enum, Integer
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class ProgramStatus(str, enum.Enum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    PENDING_INITIATION = "pending_initiation"
    INITIATED = "initiated"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    REJECTED = "rejected"
    ON_HOLD = "on_hold"


class Program(BaseModel):
    __tablename__ = "programs"
    
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    catalog_item_id = Column(Integer, ForeignKey("visa_processing_catalog.id"), nullable=False)
    cohort_id = Column(Integer, ForeignKey("cohorts.id"))
    
    status = Column(Enum(ProgramStatus), default=ProgramStatus.DRAFT)
    proposed_budget = Column(Numeric(10, 2))
    proposed_start_date = Column(Date)
    proposed_end_date = Column(Date)
    official_start_date = Column(Date)
    
    is_initiated = Column(Boolean, default=False)
    initiated_at = Column(Date)
    initiated_by_id = Column(Integer, ForeignKey("clients.id"))
    
    internal_notes = Column(String)
    
    client = relationship("Client", back_populates="programs", foreign_keys=[client_id])
    catalog_item = relationship("VisaProcessingCatalog", back_populates="programs")
    cohort = relationship("Cohort", back_populates="programs")
    payments = relationship("Payment", back_populates="program")
    
    marriage_details = relationship("MarriageProcessDetails", back_populates="program", uselist=False)
    business_details = relationship("BusinessProcessDetails", back_populates="program", uselist=False)
    envoy_details = relationship("MinistryEnvoyProcessDetails", back_populates="program", uselist=False)
    medical_details = relationship("MedicalProcessDetails", back_populates="program", uselist=False)
