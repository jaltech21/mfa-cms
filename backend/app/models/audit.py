from sqlalchemy import Column, String, Integer, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.models.base import BaseModel


class SystemAuditLog(BaseModel):
    __tablename__ = "system_audit_logs"
    
    user_id = Column(Integer, ForeignKey("clients.id"))
    action = Column(String, nullable=False)
    entity_type = Column(String)
    entity_id = Column(Integer)
    ip_address = Column(String)
    user_agent = Column(String)
    
    details = Column(JSON)
    description = Column(Text)
    
    user = relationship("Client")
