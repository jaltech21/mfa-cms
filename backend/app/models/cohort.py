from sqlalchemy import Column, String, Boolean, Date, Enum
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class CohortType(str, enum.Enum):
    DELEGATION = "delegation"
    FAMILY = "family"
    ENVOY = "envoy"
    OTHER = "other"


class Cohort(BaseModel):
    __tablename__ = "cohorts"
    
    name = Column(String, nullable=False)
    cohort_type = Column(Enum(CohortType), nullable=False)
    description = Column(String)
    start_date = Column(Date)
    end_date = Column(Date)
    is_active = Column(Boolean, default=True)
    
    programs = relationship("Program", back_populates="cohort")
