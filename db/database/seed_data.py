from . import db 
from .model import User



def seed_users():
    user = User.getUserByEmail(email="admin@mail.com")
    if not user:
        new_user = User(username="admin", email="admin@mail.com")
        new_user.setPassword('admin123')
        db.session.add(new_user)
        db.session.commit()
