import json
from flask import render_template, request, Blueprint
from flask_login import login_required, current_user
from BubblesWeb.model import app, db, Article

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

    return render_template('articles.html', name=current_user.name, arts=resp['arts'], agree=4)


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
            # na = n_arts.agree
        return json.dumps({'agree': n_arts.agree, 'id': art_id['artId']})