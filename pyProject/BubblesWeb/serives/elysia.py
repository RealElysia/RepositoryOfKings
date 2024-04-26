import json
from flask import render_template, request, Blueprint, send_file
from flask_login import login_required
from BubblesWeb.model import app, Wife

bp = Blueprint('realme', __name__)


@bp.route('/elysia')
@login_required
def wife_elysia():
    return render_template('elysia.html')


@bp.route('/queryElysia')
def query_info():
    if request.method == 'GET':
        with app.app_context():
            elysia = Wife.query.filter_by(name='爱莉希雅').first()
        return json.dumps(elysia.story)


@bp.route('/emusic')
def bg_music():
    return send_file('static/TruE.mp3', mimetype='audio/mpeg')


@bp.route('/vd_elysia')
def vd_elysia():
    return send_file('static/video_elysia.mp4', mimetype='video/mp4')