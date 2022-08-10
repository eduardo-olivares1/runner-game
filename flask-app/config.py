import os

basedir = os.path.abspath(os.path.dirname(__name__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "4QYfmkGos5nFGMFcPQ9Mx3s701jlqJpd"

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    EXPLAIN_TEMPLATE_LOADING = True


class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False


class PreProductionConfig(Config):
    pass


class ProductionConfig(Config):
    pass


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "preproduction": PreProductionConfig,
    "default": DevelopmentConfig,
}
