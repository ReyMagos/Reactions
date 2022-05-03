import os

from flask import Flask, jsonify, request, render_template, send_from_directory, make_response

from backend.DataBase.DataBaseController import Controller
from backend.SearchFunc.Searcher import search

control = Controller()
template_dir = os.path.abspath('/Users/Rey/Reactions/dist')
app = Flask(__name__, template_folder=template_dir)
with app.app_context():
    res = make_response(render_template("index.html"))


@app.route("/")
def index():
    res.set_cookie("is_authorized", str(False))
    res.set_cookie("username", "")
    return res
    return render_template("index.html"), 200


@app.route("/<path:filename>")
def dist(filename):
    return send_from_directory("dist", filename)


@app.route("/login", methods=["GET", "POST"])
def login_page():
    data = request.get_json()
    user = control.get_user_by_name(data.get('login'))
    if not user:
        return jsonify({"status": 401}), 401
    else:
        if user.check_password(data['password']):
            res.set_cookie("is_authorized", str(True))
            res.set_cookie("username", str(user.username))
            return jsonify({"username": user.username}), 200
        else:
            return jsonify({"status": 401}), 401


@app.route("/register", methods=["POST"])
def register_page():
    if request.method == "POST":
        data = request.get_json()
        if data['password'] != data['repeat_password']:
            return jsonify({"cause": "unmathed_passwords"}), 401
        if control.get_user_by_name(data.get('username')):
            return jsonify({"cause": "username_exists"}), 401
        res.set_cookie("is_authorized", str(True))
        res.set_cookie("username", str(data['username']))
        control.add_User(data['username'], data['login'], data['password'])
        return jsonify({"username": data['username']}), 200


@app.route("/film/<film_id>", methods=["GET", "POST"])
def reviews(film_id):
    if request.method == "GET":
        data = request.get_json()
        review = control.get_review_by_film(film_id)
        return jsonify({"reviews": review})
    elif request.method == "POST":
        data = request.get_json()


@app.route("/user/<user_id>", methods=["GET", "PUT"])
def my_page(user_id):
    if request.method == "GET":
        data = request.get_json()
        review = control.get_review(user_id)
        return jsonify({"reviews": review})
    if request.method == "PUT":
        data = request.get_json()


@app.route("/films", methods=["POST", "GET"])
def films():
    data = request.get_json()
    mas = search(data['text'])
    return jsonify({"films": mas}), 200


if __name__ == "__main__":
    app.run()
