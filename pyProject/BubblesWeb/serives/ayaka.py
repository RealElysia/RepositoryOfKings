import json
from flask import render_template, request, Blueprint
from flask_login import login_required
from BubblesWeb.model import app, db
from BubblesWeb.model import Wife

bp = Blueprint('kamisato', __name__)


@bp.route('/ayaka')
@login_required
def wife_ayaka():
    return render_template('ayaka.html')


@bp.route('/queryInfo')
def query_info():
    if request.method == 'GET':
        with app.app_context():
            elysia = Wife.query.filter_by(name='爱莉希雅').first()
        return json.dumps(elysia.story)


if __name__ == '__main__':
    with app.app_context():
        e = Wife.query.filter_by(name='爱莉希雅').first()
    print(e.story['story1'])