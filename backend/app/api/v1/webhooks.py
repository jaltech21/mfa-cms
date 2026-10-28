from fastapi import APIRouter, Request, HTTPException, Header
from typing import Optional
import json
from app.core.config import settings

router = APIRouter()


@router.post("/trexo")
async def trexo_webhook(
    request: Request,
    x_trexo_signature: Optional[str] = Header(None)
):
    body = await request.body()
    
    # In production, verify webhook signature
    # if settings.TREXO_WEBHOOK_SECRET:
    #     verify signature
    
    try:
        data = json.loads(body)
        # Handle incoming messages from WhatsApp via Trexo
        # Could process status queries, etc.
        return {"status": "received"}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid webhook payload")
