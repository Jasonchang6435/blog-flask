from flask import Flask, redirect, render_template, url_for
from models.base import init_db, create_db
from routes.user import main as routes_user
from routes.article import main as routes_blog
from routes.api import main as routes_api


app = Flask(__name__)


def register_routes(app):
    """
    在这个函数里面 import 并注册蓝图
    """
    app.register_blueprint(routes_user, url_prefix='/user')
    app.register_blueprint(routes_blog, url_prefix='/article')
    app.register_blueprint(routes_api, url_prefix='/api')


def configured_app():
    # 注册路由
    register_routes(app)
    # 返回配置好的 app 实例
    return app


@app.route('/')
def hello_world():
    return redirect(url_for('.articles'))


@app.route('/articles', methods=['GET'])
def articles():
    return render_template('article/index.html')


if __name__ == '__main__':
    init_db()
    app = configured_app()
    app.run(debug=True)
