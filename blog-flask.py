from flask import Flask
from models import *

app = Flask(__name__)


def register_routes(app):
    """
    在这个函数里面 import 并注册蓝图
    """
    from routes.user import main as routes_user
    from routes.blog import main as routes_blog
    app.register_blueprint(routes_user, url_prefix='/user/')
    app.register_blueprint(routes_blog, url_prefix='/blog/')


def configured_app():
    # 注册路由
    register_routes(app)
    # 返回配置好的 app 实例
    return app


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    initialize_db()
    app = configured_app()
    app.run(debug=True)
