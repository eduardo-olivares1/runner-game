from selenium_test import SeleniumTestCase
from selenium.webdriver.common.by import By


class HomePageTest(SeleniumTestCase):
    def setUp(self):
        if not self.browser:
            self.skipTest("Selenium browser not available")
        else:
            self.browser.get("http://localhost:5000/")

    def test_correct_nav_bar(self):
        nav_bar = self.browser.find_element(By.XPATH, "//nav[1]")
        first_nav_item = nav_bar.find_element(By.XPATH, "./ul/li[1]/a")

        self.assertEqual("Voz Games", first_nav_item.text)
        self.assertEqual("http://localhost:5000/", first_nav_item.get_attribute("href"))

    def test_correct_footer(self):
        footer = self.browser.find_element(By.XPATH, "//footer")
        self.assertEqual("© Copyright Your Entity", footer.text)
