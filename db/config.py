import os 
from dotenv import load_dotenv


load_dotenv()


basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    DEBUG = True
    
    @classmethod
    def init_app(app):
        pass
    
    
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_URL') or \
        "sqlite:///" + os.path.join(basedir, "development-data.sqlite")
    SQLALCHEMY_TRACK_MODIFICATIONS = True



class TestingConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DEV_URL') or \
        "sqlite:///" + os.path.join(basedir, "test-data.sqlite")
    SQLALCHEMY_TRACK_MODIFICATIONS = True



config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "default": DevelopmentConfig
}