from flask import render_template, send_from_directory
from . import main


@main.route("/")
def home():
    return render_template("main/index.html")


@main.route("/static/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)
