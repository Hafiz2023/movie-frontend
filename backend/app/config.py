from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Movie App Backend"
    PROJECT_VERSION: str = "1.0.0"
    DATABASE_URL: str = "postgresql://user:password@localhost/movie_db"
    SECRET_KEY: str = "changeme"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
