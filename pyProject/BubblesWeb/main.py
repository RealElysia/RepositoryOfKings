from flask import Flask
from flask_login import LoginManager


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'Kamisato Ayaka'
    # 登录保护
    lm = LoginManager()
    lm.init_app(app)
    lm.login_view = 'basic.login'
    import sys
    sys.path.append('/BubblesWeb/')
    from BubblesWeb.model import User
    from BubblesWeb.model import app as a

    @lm.user_loader
    def load_user(id):
        with a.app_context():
            return User.query.filter_by(user_id=id).first()

    # 蓝图注册
    from BubblesWeb.serives import seller, base, buyers, articles, elysia, ayaka
    app.register_blueprint(base.bp)
    app.register_blueprint(seller.bp)
    app.register_blueprint(buyers.bp)
    app.register_blueprint(articles.bp)
    app.register_blueprint(elysia.bp)
    app.register_blueprint(ayaka.bp)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=80, debug=True)