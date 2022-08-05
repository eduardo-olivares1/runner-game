from time import sleep
from selenium_test import SeleniumTestCase
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class FormPageTest(SeleniumTestCase):
    def setUp(self):
        if not self.browser:
            self.skipTest("Selenium browser not available")
        else:
            self.browser.get("http://localhost:5000/form")

    def test_user_sees_correct_form(self):
        field1 = self.browser.find_element("id", "field1")
        self.assertEqual(field1.get_attribute("name"), "field1")

        # Ensure default dropdown item exist
        field2 = self.browser.find_element(By.XPATH, "//select")
        field2_option1 = field2.find_element(By.XPATH, "./option[1]")
        self.assertEqual(field2_option1.text, "--Select a Value --")
        email_field = self.browser.find_element("id", "email")
        self.assertEqual(email_field.get_attribute("name"), "email")
        confirm_email_field = self.browser.find_element("id", "confirm_email")
        self.assertEqual(confirm_email_field.get_attribute("name"), "confirm_email")
        submit_button = self.browser.find_element("id", "submit")
        self.assertEqual(submit_button.get_attribute("name"), "submit")

    def test_user_sees_error_if_emails_not_same(self):
        self.browser.find_element("id", "field1").send_keys("John Smith")
        self.assertEqual(
            self.browser.find_element("id", "field1").get_attribute("value"),
            "John Smith",
        )
        select_field = Select(self.browser.find_element("id", "select_filed"))
        select_field.select_by_visible_text("Pizza")
        self.browser.find_element("id", "email").send_keys("john.smith@fake.com")
        self.browser.find_element("id", "confirm_email").send_keys("jane.doe@fake.com")
        self.browser.find_element("id", "submit").send_keys("john.smith@fake.com")
        submit_button = self.browser.find_element("id", "submit")

        submit_button.click()

        wait = WebDriverWait(self.browser, 30)
        wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "#example-alert"))
        )
        error_message = self.browser.find_element("id", "example-alert")
        self.assertEqual(error_message.text, "Emails must match")

    def test_user_redirected_after_correct_form_submission(self):
        self.browser.find_element("id", "field1").send_keys("John Smith")
        self.assertEqual(
            self.browser.find_element("id", "field1").get_attribute("value"),
            "John Smith",
        )
        select_field = Select(self.browser.find_element("id", "select_filed"))
        select_field.select_by_visible_text("Pizza")
        self.browser.find_element("id", "email").send_keys("john.smith@fake.com")
        self.browser.find_element("id", "confirm_email").send_keys(
            "john.smith@fake.com"
        )
        self.browser.find_element("id", "submit").send_keys("john.smith@fake.com")
        submit_button = self.browser.find_element("id", "submit")

        submit_button.click()

        wait = WebDriverWait(self.browser, 30)
        wait.until(EC.url_to_be("http://localhost:5000/submission-success"))
        success_message = self.browser.find_element("id", "success-message")
        self.assertEqual(success_message.text, "Success")
