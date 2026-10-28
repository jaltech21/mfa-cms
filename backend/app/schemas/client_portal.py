from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal


class ClientProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    nationality: Optional[str] = None
    passport_number: Optional[str] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None


class ProgramPropose(BaseModel):
    catalog_item_id: int
    proposed_budget: Decimal
    proposed_start_date: Optional[date] = None
    proposed_end_date: Optional[date] = None


class ConsentSign(BaseModel):
    terms_and_conditions_id: int
    program_id: Optional[int] = None
    signature_data: Optional[str] = None  # base64
    passport_verification: Optional[str] = None
