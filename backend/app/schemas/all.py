from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# --- User Schemas ---
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    avatar_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# --- Category Schemas ---
class CategoryBase(BaseModel):
    name: str
    slug: str
    thumbnail_url: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# --- Video Schemas ---
class VideoBase(BaseModel):
    title: str
    description: Optional[str] = None
    video_url: str
    thumbnail_url: str
    duration: str
    category_id: int
    is_premium: bool = False

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    id: int
    views: int
    likes: int
    creator_id: int
    created_at: datetime
    # We can include nested relations if needed, but keeping it flat for list views is often better
    # category: Category 
    # creator: User

    class Config:
        from_attributes = True
