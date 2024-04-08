import json
from flask import render_template, request, Blueprint
from flask_login import login_user
from werkzeug.security import generate_password_hash, check_password_hash
from BubblesWeb.model import db, app
from BubblesWeb.model import User
from datetime import datetime

bp = Blueprint('basic', __name__)


@bp.route('/')
def login():
    return render_template('login.html')


@bp.route('/register')
def register():
    return render_template('register.html')


@bp.route('/home')
def home():
    return render_template('home.html')


@bp.route('/userCheck', methods=['POST'])
def user_check():
    res = {'code': 0, 'msg': '登录成功！', 'success': True}
    if request.method == 'POST':
        uid = int(request.form['id'])
        pwd = request.form['pwd']
        with app.app_context():
            user = User.query.filter_by(user_id=uid).first()
        if user and check_password_hash(user.pwd, pwd):
            login_user(user)
            res['url'] = '/home'
            return json.dumps(res)
        else:
            res['msg'] = '登录账户错误，请重试'
            return json.dumps(res)


@bp.route('/addUser', methods=['POST'])
def user_register():
    if request.method == 'POST':
        user = request.form['user']
        pwd = request.form['pwd']
        uid = int(datetime.now().time().strftime('%H%M%S'))
        secret_pwd = generate_password_hash(pwd)
        new_user = User(user_id=uid, name=user, pwd=secret_pwd)
        with app.app_context():
            db.session.add(new_user)
            db.session.commit()
        result = {'code': 0, 'msg': '注册成功', 'id': uid}
        return json.dumps(result)

