from backend.DataBase.User import User
from backend.DataBase.Review import Review
from backend.DataBase import db_session


class Controller:
    def __init__(self):
        db_session.global_init("reactions.db")
        self.db_sess = db_session.create_session()
        return

    def get_review(self, user_id):
        mas = []
        for review in self.db_sess.query(Review).filter(Review.creator_id == user_id):
            mas.append(review)
        return mas

    def get_reviews(self):
        mas = []
        for review in self.db_sess.query(Review).all():
            mas.append({"author": review.creator_username, "text": review.content})
        return mas

    def add_User(self, name, login, password):
        user = User(username=name, login=login)
        user.set_password(password)
        self.db_sess.add(user)
        self.db_sess.commit()

    def add_review(self, content, creator_username, film):
        review = Review(content=content, creator_username=creator_username, film=film)
        user = self.get_user(creator_username)
        user.review.append(review)
        self.db_sess.add(review)
        self.db_sess.commit()

    def get_user(self, user_id):
        return self.db_sess.query(User).filter(User.id == user_id).first()

    def get_user_by_name(self, nickname):
        return self.db_sess.query(User).filter(User.username == nickname).first()

    def get_review_by_id(self, review_id):
        return self.db_sess.query(Review).filter(Review.id == review_id).first()

    def get_review_by_film(self, films):
        mas = []
        for review in self.db_sess.query(Review).filter(Review.film == films).all():
            mas.append({"author": review.creator_username, "text": review.content})
        return mas
