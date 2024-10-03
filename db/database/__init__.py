from flask import Flask 
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from config import config 


db = SQLAlchemy()
bcrypt = Bcrypt()


def create_db(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app()
    
    
    db.init_app(app)
    bcrypt.init_app(app)
    
    return app 

