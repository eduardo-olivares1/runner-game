from flask import render_template, redirect, url_for, flash, current_app
from .forms import ExampleForm
from . import main


@main.route("/")
def home():
    return render_template("main/index.html")
