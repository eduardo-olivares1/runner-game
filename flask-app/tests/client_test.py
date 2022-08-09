import unittest
from app import create_app, db


class FlaskClientTestCase(unittest.TestCase):
    app = None

    @classmethod
    def setUpClass(self):
        self.app = create_app("testing")
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
