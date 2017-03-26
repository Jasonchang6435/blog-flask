from routes import *
from models.article import Article
import json


main = Blueprint('api', __name__)


@main.route('/article/<int:article_id>', methods=['GET'])
def api_article(article_id):
    m = Article.retrieve(id=article_id)
    if m is not None:
        d = dict(
            data=m.column_dict(),
            success=True,
        )
        return json.dumps(d, ensure_ascii=False)
    else:
        abort(404)


@main.route('/articles', methods=['GET'])
def api_articles():
    ms = Article.all()
    d = dict(
        data=[m.column_dict() for m in ms],
        success=True,
    )
    return json.dumps(d, ensure_ascii=False)
