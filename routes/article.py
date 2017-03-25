from routes import *
from models.article import Article


main = Blueprint('article', __name__)

Model = Article


@main.route('/')
def index():
    ms = Model.all()
    log('debug ms', ms)
    return render_template('article/index.html', ms=ms)


@main.route('/<int:article_id>', methods=['GET'])
def detail(article_id):
    m = Model.retrieve(id=article_id)
    log('info m', m)
    if m is not None:
        return render_template('article/detail.html', m=m)
    else:
        return abort(404)
