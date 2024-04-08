import json
from flask import render_template, request, Blueprint
from flask_login import login_required
from BubblesWeb.model import app, db

bp = Blueprint('realme', __name__)


@bp.route('/elysia')
@login_required
def wife_elysia():
    return render_template('elysia.html')