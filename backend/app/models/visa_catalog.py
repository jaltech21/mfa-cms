from sqlalchemy import Column, String, Boolean, Numeric, Enum
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class ProgramType(str, enum.Enum):
    MARRIAGE = "marriage"
    BUSINESS = "business"
    MINISTRY_ENVOY = "ministry_envoy"
    MEDICAL = "medical"


class VisaProcessingCatalog(BaseModel):
    __tablename__ = "visa_processing_catalog"
    
    program_type = Column(Enum(ProgramType), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    standard_price = Column(Numeric(10, 2), nullable=False)
    currency = Column(String, default="USD")
    is_active = Column(Boolean, default=True)
    requirements = Column(String)
    
    programs = relationship("Program", back_populates="catalog_item")
