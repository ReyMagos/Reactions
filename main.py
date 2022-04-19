from flask import Flask
from flask_login import LoginManager, login_required
from werkzeug.utils import redirect
from backend.DataBase.User import User
from backend.DataBase import db_session

app = Flask(__name__)
app.config['SECRET_KEY'] = 'review14354fdggkdfgk'
login_manager = LoginManager()
login_manager.init_app(app)


@app.route("/")
def index():
    return "sfg"


@app.route("/login", methods=["GET", "POST"])
def login_page():
    return "login"


@app.route("/register", methods=["GET", "POST"])
def register_page():
    return "register"


@app.route("/<id>", methods=["GET", "POST"])
def page():
    return "page"


@app.route("/reviews/<name>", methods=["GET", "POST"])
def cinema(name):
    return f'{name}'


@app.route('/logout')
@login_required
def logout():
    # logout_user()
    return redirect("/")


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


if __name__ == "__main__":
    app.run(port=8080, host='127.0.0.1')
