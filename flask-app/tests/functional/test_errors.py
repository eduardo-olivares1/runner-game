from selenium_test import SeleniumTestCase
from selenium.webdriver.common.by import By


class ErrorPageTest(SeleniumTestCase):
    def setUp(self):
        if not self.browser:
            self.skipTest("Selenium browser not available")
        else:
            self.browser.get("http://localhost:5000/notarealpage")

    def test_correct_404_page(self):
        self.assertEqual(self.browser.title, "404")
        h1_error = self.browser.find_element(By.XPATH, "//h1[1]")
        self.assertEqual(h1_error.text, "404")
