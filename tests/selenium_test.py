from selenium import webdriver
import unittest


class SeleniumTestCase(unittest.TestCase):
    browser = None

    @classmethod
    def setUpClass(cls):
        # start Chrome in headless mode (no visible browser)
        options = webdriver.ChromeOptions()
        options.add_argument("headless")
        # Need this to run in docker container
        options.add_argument("no-sandbox")

        try:
            cls.browser = webdriver.Chrome(chrome_options=options)
        except:
            pass

    @classmethod
    def tearDownClass(cls):
        if cls.browser:
            cls.browser.quit()
