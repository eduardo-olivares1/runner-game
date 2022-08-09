from client_test import FlaskClientTestCase
from app import db
from app.models import ExampleModel
from datetime import datetime


class DataBaseTest(FlaskClientTestCase):
    def test_example_model_entry(self):
        new_example_entry = ExampleModel("John Smith", "john.smith@fake.com", "Corn")
        db.session.add(new_example_entry)
        db.session.commit()

        example_entry = ExampleModel.query.all()[0]

        self.assertEqual(example_entry.username, "John Smith")
        self.assertEqual(example_entry.email, "john.smith@fake.com")
        self.assertEqual(example_entry.favorite_food, "Corn")
        self.assertTrue(type(example_entry.id) is int)
        self.assertTrue(type(example_entry.timestamp) is datetime)
