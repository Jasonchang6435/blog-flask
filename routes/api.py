from routes import *
from models.article import Article


main = Blueprint('api', __name__)


@main.route('/article/<int:article_id>', methods=['GET'])
def api_article(article_id):
    status, data, msgs = Article.retrieve(id=article_id)
    return iv_json_response(status, data, msgs)


@main.route('/articles', methods=['GET'])
def api_articles():
    status, data, msgs = Article.all()
    return iv_json_response(status, data, msgs)


@main.route('/article/new', methods=['POST'])
def api_new():
    form = request.get_json()
    status, data, msgs = Article.create(form)
    return iv_json_response(status, data, msgs)