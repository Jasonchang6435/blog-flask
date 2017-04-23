from routes import *
from models.article import Article


main = Blueprint('article', __name__)

Model = Article


@main.route('/<int:article_id>', methods=['GET'])
def detail(article_id):
    status, data, msgs = Model.retrieve(id=article_id)
    if status:
        return render_template('article/detail.html', m=data.get('article'))
    else:
        return abort(404)


@main.route('/new', methods=['GET'])
def new():
    return render_template('article/new.html')
