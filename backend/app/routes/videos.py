from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import all as models
from app.schemas import all as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Video])
def get_videos(
    skip: int = 0, 
    limit: int = 100, 
    category_id: int = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Video)
    if category_id:
        query = query.filter(models.Video.category_id == category_id)
    return query.offset(skip).limit(limit).all()

@router.post("/", response_model=schemas.Video)
def create_video(video: schemas.VideoCreate, db: Session = Depends(get_db)):
    # In a real app, you'd get the creator_id from the current_user dependency
    fake_creator_id = 1 
    db_video = models.Video(**video.model_dump(), creator_id=fake_creator_id)
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

@router.get("/{video_id}", response_model=schemas.Video)
def get_video(video_id: int, db: Session = Depends(get_db)):
    video = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    # Increment view count
    video.views += 1
    db.commit()
    return video
