from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, TextAreaField, SubmitField, EmailField
from wtforms.validators import DataRequired


class ReviewForm(DataRequired):
    title = StringField('Заголовок', validators=[DataRequired()])
    content = TextAreaField("Содержание")
    submit = SubmitField('Применить')
