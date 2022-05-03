import os

from flask import Flask, jsonify, request, render_template, send_from_directory, make_response

from backend.DataBase.DataBaseController import Controller
from backend.SearchFunc.Searcher import search
from backend.content import Films

control = Controller()
template_dir = os.path.abspath('/Users/Rey/Reactions/dist')
app = Flask(__name__, template_folder=template_dir)


@app.route("/")
def index():
    res = make_response(render_template("index.html"))
    res.set_cookie("is_authorized", str(False))
    res.set_cookie("username", "")
    return res, 200


@app.route("/<path:filename>")
def dist(filename):
    return send_from_directory("dist", filename)


@app.route("/login", methods=["GET", "POST"])
def login_page():
    data = request.get_json()
    user = control.get_user_by_name(data.get('login'))
    res = make_response()
    if not user:
        return res, 401
    else:
        if user.check_password(data['password']):
            res.set_cookie("is_authorized", str(True))
            res.set_cookie("username", str(user.username))
            return res, 200
        else:
            return res, 401


@app.route("/register", methods=["POST"])
def register_page():
    if request.method == "POST":
        data = request.get_json()
        res = make_response("")
        if data['password'] != data['repeat_password']:
            res.headers["cause"] = "unmathed_password"
            return res, 401
        if control.get_user_by_name(data.get('username')):
            res.headers["cause"] = "username_exists"
            return res, 401
        res.set_cookie("is_authorized", str(True))
        res.set_cookie("username", str(data['username']))
        control.add_User(data['username'], data['login'], data['password'])
        return res, 200


@app.route("/reviews/<film>", methods=["GET", "POST", "PUT"])
def reviews(film):
    if request.method == "GET":
        data = request.get_json()
        review = control.get_review_by_film(film)
        return jsonify({"reviews": review, "name": Films.mas[int(film)]}), 200
    elif request.method == "POST":
        data = request.get_json()
        control.add_review(data['text'], data['author'], int(film))
        return jsonify({}), 200
    elif request.method == "PUT":
        data = request.get_json()


@app.route("/my_page/<user_id>", methods=["GET", "PUT"])
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
    ans = []
    for i in range(len(mas)):
        ans.append({"name": mas[i][0], "id": mas[i][1]})
    return jsonify({"films": ans}), 200


@app.route("/logout", methods=["POST", "GET"])
def logout():
    data = request.get_json()
    res = make_response("")
    if request.cookies.get("is_authorized", "False") == "True":
        res.set_cookie("is_authorized", str(False))
        res.set_cookie("username", "")
        return res, 200
    else:
        return res, 401


if __name__ == "__main__":
    app.run()
