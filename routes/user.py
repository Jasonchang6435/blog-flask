from routes import *
from models.user import User
import json

main = Blueprint('user', __name__)

Model = User


@main.route('/index', methods=['GET'])
def index():
    ms = Model.all()
    log('debug ms', ms)
    return render_template('user/index.html')


@main.route('/<int:user_id>/profile', methods=['GET'])
def detail(user_id):
    m = Model.retrieve(id=user_id)
    log(m)
    return render_template('user/profile.html', u=m)


@main.route('/register', methods=['POST'])
def register():
    d = request.get_json()
    log('info d', d)
    u = User.new(d)
    log('info u', u)
    r = dict(
        data=u.column_dict(),
        success=True,
        href='/user/{}/profile'.format(u.id)
    )
    return json.dumps(r, ensure_ascii=False)


@main.route('/login', methods=['POST'])
def login():
    d = request.get_json()
    u = User.retrieve(name=d.get('name'))
    log('info u', u)
    r = dict(
        data=u.column_dict(),
        success=True,
        href='/user/{}/profile'.format(u.id)
    )
    return json.dumps(r, ensure_ascii=False)


@main.route('/<int:user_id>/change-password', methods=['POST'])
def change_password(user_id):
    d = request.get_json()
    u = User.update()
    log('info u', u)
    r = dict(
        data=u.column_dict(),
        success=True,
        href='/user/{}/profile'.format(u.id)
    )
    return json.dumps(r, ensure_ascii=False)





