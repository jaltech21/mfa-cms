from pydantic import BaseModel
from typing import Optional
from datetime import date


class CohortBase(BaseModel):
    name: str
    cohort_type: str
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_active: bool = True


class CohortCreate(CohortBase):
    pass


class CohortUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_active: Optional[bool] = None


class CohortResponse(CohortBase):
    id: int

    class Config:
        from_attributes = True
