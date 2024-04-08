from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1111@127.0.0.1:3306/stores'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True

db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    pwd = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.user_id}>'

    def get_id(self):
        return self.user_id


class Items(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(30), nullable=False)
    brand = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    sales = db.Column(db.Integer, nullable=False)
    inventory = db.Column(db.Integer, nullable=False)
    pic_name = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Items {self.id}>'


class Article(db.Model):
    __tablename__ = 'articles'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(60), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users'))
    agree = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return f'<Article {self.id}>'


class Wife(db.Model):
    __tablename__ = 'wife'
    name = db.Column(db.String(50), nullable=False, primary_key=True)
    birthday = db.Column(db.Date, nullable=False)
    mark = db.Column(db.String(50), nullable=False)
    story = db.Column(db.JSON, nullable=False)
    picture = db.Column(db.String(255), nullable=False, default='null')

    def __repr__(self):
        return f'<Wife {self.name}>'


with app.app_context():
    db.create_all()