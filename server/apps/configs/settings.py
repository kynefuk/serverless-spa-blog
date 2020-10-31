from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "blog"
    DEBUG: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
