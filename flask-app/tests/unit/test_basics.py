import client_test
from tests.client_test import FlaskClientTestCase
from flask import current_app


class BasicTests(FlaskClientTestCase):
    def test_app_exists(self):
        self.assertFalse(current_app is None)

    def test_app_is_testing_config(self):
        self.assertTrue(current_app.config["TESTING"])
