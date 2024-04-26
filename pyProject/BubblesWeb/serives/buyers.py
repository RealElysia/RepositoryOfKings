import json
import sys
sys.path.append('/BubblesWeb/')
from flask import render_template, request, Blueprint
from flask_login import login_required
from BubblesWeb.model import app, db
from BubblesWeb.model import Items

bp = Blueprint('buy', __name__)
USER_MONEY = 99999
resp = {'code': 0, 'msg': 'Happy shopping for you', 'success': True}


@bp.route('/buyer', methods=['GET'])
@login_required
def Buyer():
    global USER_MONEY, resp
    if request.method == 'GET':
        with app.app_context():
            items = Items.query.all()
            item_dicts = [{column: getattr(item, column) for column in item.__table__.columns.keys()} for item in items]
        resp['items'] = item_dicts

    return render_template('buyer.html', resp=resp['items'], wallet=USER_MONEY)


@bp.route('/payNow', methods=['POST'])
def pay_now():
    global USER_MONEY, resp
    if request.method == 'POST':
        qid = request.form['id']
        with app.app_context():
            item = Items.query.get(qid)
            if item is not None:
                # 更新库存、销量
                new_sale = int(item.sales) + 1
                new_inventory = int(item.inventory) - 1
                db.session.query(Items).filter_by(id=qid).update({'sales': new_sale})
                db.session.query(Items).filter_by(id=qid).update({'inventory': new_inventory})
                db.session.commit()
                # 扣除购买金额
                USER_MONEY = USER_MONEY - int(item.price)
                resp['msg'] = '购买成功,请等待发货!'
                return json.dumps(resp)


@bp.route('/cartPay', methods=['POST'])
def cart_pay():
    global USER_MONEY, resp
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        for item in data:
            qid = item['id']
            with app.app_context():
                item = Items.query.get(qid)
                if item is not None:
                    # 更新库存、销量
                    new_sale = int(item.sales) + 1
                    new_inventory = int(item.inventory) - 1
                    db.session.query(Items).filter_by(id=qid).update({'sales': new_sale})
                    db.session.query(Items).filter_by(id=qid).update({'inventory': new_inventory})
                    db.session.commit()
                    # 扣除购买金额
                    USER_MONEY = USER_MONEY - int(item.price)
        resp['msg'] = '购买成功,请等待发货!'
        return resp


@bp.route('/userRecharge', methods=['POST'])
def user_recharge():
    global USER_MONEY, resp
    if request.method == 'POST':
        new_money = int(request.form['userChange'])
        USER_MONEY = USER_MONEY + new_money
        resp['msg'] = '充值成功，快去买买买吧！'
        return resp
