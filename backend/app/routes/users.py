from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
def get_current_user_profile():
    return {"id": 1, "username": "user"}
