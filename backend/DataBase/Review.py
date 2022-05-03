import datetime
import sqlalchemy
from sqlalchemy import orm
from .db_session import SqlAlchemyBase


class Review(SqlAlchemyBase):
    __tablename__ = "reviews"

    id = sqlalchemy.Column(sqlalchemy.Integer, autoincrement=True, primary_key=True)
    content = sqlalchemy.Column(sqlalchemy.String, nullable=True)
    id_film = sqlalchemy.Column(sqlalchemy.Integer, nullable=True)
    creator_username = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("users.username"))
    user = orm.relation("User")