import os

basedir = os.path.abspath(os.path.dirname(__name__))


class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY") or "4QYfmkGos5nFGMFcPQ9Mx3s701jlqJpd"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("DEV_DATABASE_URL", "sqlite:///")
    EXPLAIN_TEMPLATE_LOADING = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("TEST_DATABASE_URL", "sqlite:///")
    WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DEV_DATABASE_URL", "sqlite:///" + os.path.join(basedir, "data.sqlite")
    )


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
