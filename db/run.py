#!/usr/bin/env python3
import os 
from database import create_db, db 
from database.seed_data import seed_users




app = create_db(os.getenv('FLASK_ENV',"default")) 


def inilize_database():
    with app.app_context():
        db.create_all()
        seed_users()



if __name__ == "__main__":
    inilize_database()
    app.run()

    
