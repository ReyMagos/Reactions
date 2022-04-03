from DataBase.User import User
from DataBase.Review import Review
from DataBase import db_session


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
            mas.append(review)
        return mas

    def add_User(self, name, surname, about, password):
        user = User(name=name, surname=surname, about=about, hashed_passowrd=password)
        self.db_sess.add(user)
        self.db_sess.commit()

    def add_review(self, title, content, creator_id):
        review = Review(title=title, content=content, creator_id=creator_id)
        user = self.get_user(creator_id)
        user.review.append(review)
        self.db_sess.add(review)
        self.db_sess.commit()

    def get_user(self, user_id):
        return self.db_sess.query(User).filter(User.id == user_id).first()

    def get_review(self, review_id):
        return self.db_sess.query(Review).filter(Review.id == review_id).first()