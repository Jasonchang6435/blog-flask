from routes import *
from models.blog import Blog


main = Blueprint('blog', __name__)

Model = Blog


@main.route('')
def index():
    ms = Model.all()
    log('debug ms', ms)
    return render_template('blog/index.html', ms=ms)


@main.route('/<int:blog_id>', methods=['GET'])
def detail(blog_id):
    m = Model.retrieve(id=blog_id)
    log('info m', m)
    return render_template('blog/detail.html', m=m)
