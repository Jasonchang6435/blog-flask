from routes import *
from models.article import Article


main = Blueprint('api', __name__)


@main.route('/article/<int:article_id>', methods=['GET'])
def api_article(article_id):
    m = Article.retrieve(id=article_id)
    if m is not None:
        return success_response(data=m.column_dict())
    else:
        abort(404)


@main.route('/articles', methods=['GET'])
def api_articles():
    ms = Article.all()
    l = [m.column_dict() for m in ms]
    return success_response(data=l)
