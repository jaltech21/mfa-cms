from sqlalchemy import Column, String, Numeric, Date, ForeignKey, Enum, Integer
from sqlalchemy.orm import relationship
from app.models.base import BaseModel
import enum


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PAID = "paid"
    PARTIAL = "partial"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"


class PaymentType(str, enum.Enum):
    VISA_FEE = "visa_fee"
    SERVICE_CHARGE = "service_charge"
    OTHER = "other"


class Payment(BaseModel):
    __tablename__ = "payments"
    
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    program_id = Column(Integer, ForeignKey("programs.id"), nullable=False)
    
    payment_type = Column(Enum(PaymentType), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String, default="USD")
    status = Column(Enum(PaymentStatus), default=PaymentStatus.PENDING)
    
    payment_date = Column(Date)
    receipt_number = Column(String)
    receipt_url = Column(String)
    reference_number = Column(String)
    
    notes = Column(String)
    recorded_by_id = Column(Integer, ForeignKey("clients.id"))
    
    client = relationship("Client", back_populates="payments", foreign_keys=[client_id])
    program = relationship("Program", back_populates="payments")
    recorded_by = relationship("Client", foreign_keys=[recorded_by_id])
