import json, os
import sys
sys.path.append('/BubblesWeb/')
from flask import render_template, request, Blueprint
from flask_login import login_required
from werkzeug.utils import secure_filename
from BubblesWeb.model import app, db
from BubblesWeb.model import Items
from datetime import datetime

bp = Blueprint('sell', __name__)
resp = {'code': 0, 'msg': 'Happy shopping for you', 'success': True}


@bp.route('/seller')
@login_required
def seller():
    global resp
    if request.method == 'GET':
        with app.app_context():
            items = Items.query.all()
            user_dicts = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in items]
        resp['items'] = user_dicts
    return render_template('sellers.html', result=resp['items'])


@bp.route('/addItem', methods=['POST'])
def add_item():
    global resp
    if request.method == 'POST':
        file = request.files['image']
        b = request.form['brand']
        n = request.form['name']
        t = request.form['type']
        p = int(request.form['price'])
        i = int(request.form['inventory'])
        id = int(datetime.now().time().strftime('%H%M%S'))
        # 图片处理
        if 'image' not in request.files:
            resp['msg'] = '文件为空'

        fname = secure_filename(file.filename)
        file.save(os.path.join('../static/user/', fname))
        with app.app_context():
            item = Items(id=id, brand=b, name=n, type=t, price=p, inventory=i, pic_name=fname, sales=0)
            db.session.add(item)
            db.session.commit()
            resp['msg'] = '添加成功！'
        return resp


@bp.route('/queryAll', methods=['GET'])
def query_all():
    if request.method == 'GET':
        # global resp
        with app.app_context():
            items = Items.query.all()
        user_dicts = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in items]
        resp['items'] = user_dicts
        return json.dumps(resp)


@bp.route('/queryById', methods=['POST'])
def query_by_id():
    global resp
    if request.method == 'POST':
        item_id = int(request.form['id'])
        with app.app_context():
            item = Items.query.filter_by(id=item_id).first()
            item_dict = {column: getattr(item, column) for column in item.__table__.columns.keys()}

        if item is not None:
            resp['items'] = item_dict
        return resp


@bp.route('/queryByName', methods=['POST'])
def query_by_name():
    if request.method == 'POST':
        global resp
        q = request.form['param']
        with app.app_context():
            items = Items.query.filter(Items.name.like(f'%{q}%')).all()
            if items is not None:
                item_dict = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in items]
                resp['items'] = item_dict
                return json.dumps(resp)
            else:
                resp['items'] = ''
                resp['msg'] = '你搜索的宝贝不存在，请重试!'
                return json.dumps(resp)


@bp.route('/queryByType', methods=['GET'])
def query_by_type():
    if request.method == 'GET':
        global resp
        q = request.args.get('type')
        item_list = []
        with app.app_context():
            if q == 'all':
                items = Items.query.all()
                item_list = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in
                             items]
            else:
                items = Items.query.filter_by(type=q).all()
                item_list = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in
                             items]

        resp['items'] = item_list
        return json.dumps(resp)


def update_object(obj, data):
    # 处理前端数据，为空时不修改
    for key, value in data.items():
        if hasattr(obj, key) and value:
            setattr(obj, key, value)


@bp.route('/update', methods=['POST'])
def update():
    global resp
    if request.method == 'POST':
        id = request.form['id']
        if 'picName' in request.files:
            file = request.files['picName']
            filename = secure_filename(file.filename)
            file.save(os.path.join('../static/user/', filename))
            with app.app_context():
                db.session.query(Items).filter_by(id=id).update({'pic_name': filename})
                db.session.commit()

        new_data = request.form
        with app.app_context():
            old_data = Items.query.get(id)
            if old_data is not None:
                update_object(old_data, new_data)
                db.session.commit()

        resp['items'] = ''
        resp['msg'] = '修改成功！'
        return resp


@bp.route('/del', methods=['POST'])
def del_items():
    if request.method == 'POST':
        global resp
        json_data = request.get_json()
        del_data = json_data['items']
        for i in del_data:
            with app.app_context():
                Items.query.filter_by(id=i).delete()
                db.session.commit()
        resp['msg'] = '删除成功！'
        return resp