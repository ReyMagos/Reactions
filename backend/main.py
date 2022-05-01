from flask import Flask, jsonify, request, render_template, make_response
from werkzeug.utils import redirect
from backend.DataBase.User import User
from backend.DataBase import db_session
from backend.DataBase.DataBaseController import Controller

app = Flask(__name__)
control = Controller()


@app.route("/")
def index():
    res = make_response(render_template("index.html"))
    res.set_cookie("was", "True", max_age=60 * 60 * 24 * 365 * 2)


@app.route("/login", methods=["GET"])
def login_page():
    data = request.get_json()
    user = control.get_user_by_name(data.get('name'))
    if not user:
        return jsonify({"status": 401})
    else:
        if user.check_password(data['password']):
            return jsonify({"success": 200, "username": user.name})


@app.route("/register", methods=["GET", "POST"])
def register_page():
    if request.method == "POST":
        data = request.get_json()
        if data['password'] != data['repeat_password']:
            return jsonify({"cause": "unmathed_passwords"})
        if control.get_user_by_name(data.get('name')):
            return jsonify({"cause": "username_exists"})
        control.add_User(data['name'], data['surname'], data['about'], data['password'])
        return jsonify({"username": data['name']})


@app.route("/reviews", methods=["GET"])
def reviews(film):
    pass


if __name__ == "__main__":
    app.run()
