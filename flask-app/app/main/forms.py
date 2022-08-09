from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, EmailField
from wtforms.validators import InputRequired, EqualTo, Email
from sqlalchemy.exc import OperationalError
from ..models import ExampleModel


class ExampleForm(FlaskForm):
    # Resuable array of validators
    basic_validator = [InputRequired()]
    field1 = StringField("field1:", basic_validator)
    select_filed = SelectField("filed2:", basic_validator)
    email = EmailField(
        "email:",
        validators=[
            InputRequired(),
            EqualTo("confirm_email", message="Emails must match"),
            Email(),
        ],
    )
    confirm_email = EmailField("confirm_email:", basic_validator)
    submit = SubmitField("Submit")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Pull values from database for dropdown
        try:
            db_values = [x.favorite_food for x in ExampleModel.query.all()]
        except OperationalError:
            db_values = []

        # Initial values if database has no values
        select_field_values = [
            ("", "--Select a Value --"),
            ("Chilli", "Chilli"),
            ("Hamburgers", "Hamburgers"),
            ("Hot Dogs", "Hot Dogs"),
            ("Pizza", "Pizza"),
        ]

        for value in db_values:
            select_field_values.append((value, value))

        select_field_values.sort()

        self.select_filed.choices = select_field_values
