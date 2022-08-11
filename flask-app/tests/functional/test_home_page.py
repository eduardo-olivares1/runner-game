from selenium_test import SeleniumTestCase
from selenium.webdriver.common.by import By


class HomePageTest(SeleniumTestCase):
    def setUp(self):
        if not self.browser:
            self.skipTest("Selenium browser not available")
        else:
            self.browser.get("http://localhost:5000/")
