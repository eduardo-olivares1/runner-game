from flask import Flask
from config import config
import logging

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # Docker container mixes testing logs with dev server logs
    # when server is run in background, just disabled them to prevent this
    if config_name == "testing":
        werkzeug_log = logging.getLogger("werkzeug")
        werkzeug_log.disabled = True

    # import blueprints
    from .main import main as main_blueprint

    app.register_blueprint(main_blueprint, url_prefix="/")

    return app
