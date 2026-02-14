from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_subscriptions():
    return [{"id": 1, "plan": "Premium"}]
