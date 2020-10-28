from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str
    DEBUG: bool

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
