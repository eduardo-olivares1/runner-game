from . import db
from datetime import datetime


class ExampleModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256))
    email = db.Column(db.String(256))
    favorite_food = db.Column(db.String(128))
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, username, email, favorite_food):
        self.username = username
        self.email = email
        self.favorite_food = favorite_food

    def __repr__(self):
        return f"{self.id} {self.username} {self.email} {self.favorite_food} {self.timestamp}"
