from flask import render_template, redirect, url_for, flash, current_app
from .forms import ExampleForm
from . import main


@main.route("/")
def home():
    return render_template("main/index.html")


@main.route("/form", methods=["GET", "POST"])
def example_form():
    example_form = ExampleForm()

    if example_form.validate_on_submit():
        return redirect(url_for("main.submission_success"))

    else:
        for error_key in example_form.errors:
            for error_value in example_form.errors[error_key]:
                current_app.logger.info("%s", error_value)
                flash(error_value)

    return render_template("main/form.html", form=example_form)


@main.route("/submission-success")
def submission_success():
    return render_template("main/success.html")
