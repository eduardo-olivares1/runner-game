import unittest
from app import create_app, db


class FlaskClientTestCase(unittest.TestCase):
    app = None

    @classmethod
    def setUpClass(self):
        self.app = create_app("testing")
        self.app_context = self.app.app_context()
        self.app_context.push()

    @classmethod
    def tearDownClass(self):
        self.app_context.pop()
