import json
from flask import render_template, request, Blueprint, send_file
from flask_login import login_required
from BubblesWeb.model import app, Wife

bp = Blueprint('kamisato', __name__)


@bp.route('/ayaka')
@login_required
def wife_ayaka():
    return render_template('ayaka.html')


@bp.route('/queryAyaka')
def query_info():
    if request.method == 'GET':
        with app.app_context():
            ayaka = Wife.query.filter_by(name='神里绫华').first()
        key = 'story' + str(request.args.get('count'))
        res = ayaka.story[key]
        return json.dumps(res)


@bp.route('/amusic')
def bg_music():
    return send_file('static/Hanachirusato.mp3', mimetype='audio/mpeg')


@bp.route('/vd_ayaka')
def vd_ayaka():
    return send_file('static/ayaka_video.mp4', mimetype='video/mp4')