from typing import Dict, Any, Optional
import httpx
from app.core.config import settings


class TrexoService:
    def __init__(self):
        self.api_key = settings.TREXO_API_KEY
        self.base_url = "https://api.trexo.ai/v1"
    
    async def send_message(self, phone: str, message: str, template_id: Optional[str] = None) -> Dict[str, Any]:
        if not self.api_key:
            return {"status": "skipped", "reason": "No API key configured"}
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/messages/send",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    json={
                        "to": phone,
                        "message": message,
                        "template_id": template_id
                    }
                )
                return response.json()
            except Exception as e:
                return {"status": "error", "message": str(e)}
    
    async def send_status_update(self, phone: str, client_name: str, status: str) -> Dict[str, Any]:
        message = f"Hello {client_name}, your MFA application status has been updated to: {status}. For more details, log into your client portal."
        return await self.send_message(phone, message)
    
    async def send_payment_reminder(self, phone: str, client_name: str, amount: str) -> Dict[str, Any]:
        message = f"Hello {client_name}, you have an outstanding payment of {amount}. Please settle your fees to continue with your application process."
        return await self.send_message(phone, message)
    
    async def send_initiation_notification(self, phone: str, client_name: str) -> Dict[str, Any]:
        message = f"Hello {client_name}, great news! Your application has been initiated. You now have full access to document tracking and progress updates in your client portal."
        return await self.send_message(phone, message)


trexo_service = TrexoService()
