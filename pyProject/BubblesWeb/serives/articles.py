import json
from flask import render_template, request, Blueprint
from flask_login import login_required, current_user
from BubblesWeb.model import app, db, Article
from datetime import datetime
from random import randint

bp = Blueprint('article', __name__)


@bp.route('/talk')
@login_required
def talk_article():
    resp = {}
    if request.method == 'GET':

        with app.app_context():
            articles = Article.query.all()
            arts = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in articles]
            resp['arts'] = arts

    return render_template('articles.html', name=current_user.name, arts=resp['arts'])


@bp.route('/note')
@login_required
def note_article():
    return render_template('note.html')


@bp.route('/queryComment', methods=['POST'])
def query_comment():
    if request.method == 'POST':
        art_id = request.json
        with app.app_context():
            arts = Article.query.filter_by(id=art_id['artId']).first()
        return json.dumps(arts.comment)


@bp.route('/agree', methods=['POST'])
def agree():
    if request.method == 'POST':
        art_id = request.json

        with app.app_context():
            arts = Article.query.filter_by(id=art_id['artId']).first()
            db.session.query(Article).filter_by(id=art_id['artId']).update({'agree': arts.agree+1})
            db.session.commit()
            n_arts = Article.query.filter_by(id=art_id['artId']).first()
        return json.dumps({'agree': n_arts.agree, 'id': art_id['artId']})


@bp.route('/addArticle', methods=['POST'])
def add_article():
    if request.method == 'POST':
        data = request.get_json()
        user_id = current_user.user_id
        aid = int(datetime.now().time().strftime('%H%M%S')) * 100 + randint(1, 100)
        with app.app_context():
            act = Article(id=aid, user_id=user_id, title=data['title'], content=data['content'], agree=1, comment='null')
            db.session.add(act)
            db.session.commit()
        return {'success': True, 'msg': '发布成功'}


@bp.route('/commentSubmit', methods=['POST'])
def comment_submit():
    if request.method == 'POST':
        data = request.get_json()
        comment = {'id': data['artId'], 'comments': []}
        user_com = {'user_id': current_user.user_id, 'comment': data['comment'], 'name': current_user.name}
        comment['comments'].append(user_com)
        with app.app_context():
            db.session.query(Article).filter_by(id=data['artId']).update({'comment': comment})
            db.session.commit()
        return {'success': True, 'msg': '提交成功'}