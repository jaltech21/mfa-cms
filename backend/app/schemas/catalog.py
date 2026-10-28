from pydantic import BaseModel
from typing import Optional
from decimal import Decimal


class CatalogBase(BaseModel):
    program_type: str
    name: str
    description: Optional[str] = None
    standard_price: Decimal
    currency: str = "USD"
    requirements: Optional[str] = None
    is_active: bool = True


class CatalogCreate(CatalogBase):
    pass


class CatalogUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    standard_price: Optional[Decimal] = None
    currency: Optional[str] = None
    requirements: Optional[str] = None
    is_active: Optional[bool] = None


class CatalogResponse(CatalogBase):
    id: int

    class Config:
        from_attributes = True
