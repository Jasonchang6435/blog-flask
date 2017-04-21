from . import *
from flask import url_for
import models.base as base
import models.modelmixin as modelmixin


Base = base.Base
ModelMixin = modelmixin.ModelMixin

# 定义 多对多关系表
article_tags_table = Table(
    'article_tags',
    Base.metadata,
    Column('article_id', Integer, ForeignKey('article.id'), nullable=False),
    Column('tag_id', Integer, ForeignKey('tag.id'), nullable=False)
)


# 定义Tag 类
class Tag(Base, ModelMixin):
    __tablename__ = 'tag'

    id = Column(Integer, primary_key=True)
    tag = Column(String(20), nullable=False, unique=True)
    articles = relationship(
        'Tag',
        secondary=article_tags_table,
        backref='tags'
    )


# 定义 Article 类
class Article(Base, ModelMixin):
    __tablename__ = 'article'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    overview = Column(Text)
    author_id = Column(Integer, default=1)
    ct = Column(Integer, default=timestamp())
    ut = Column(Integer, default=timestamp())
    content = Column(Text)

    def column_dict(self):
        d = dict(self.__dict__)
        d.pop('_sa_instance_state')
        d['href'] = url_for('article.detail', article_id=self.id)
        return d

