from flask import render_template, send_from_directory, current_app
from . import main


@main.route("/")
def home():
    return render_template("main/index.html")
