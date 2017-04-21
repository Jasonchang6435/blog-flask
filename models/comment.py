from . import *
from sqlalchemy import Column, String, Text, Integer
import models.base as base
import models.modelmixin as modelmixin


Base = base.Base
ModelMixin = modelmixin.ModelMixin


# 定义User对象:
class Comment(Base, ModelMixin):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True)
    content = Column(Text)
    blog_id = Column(Integer)
    author_id = Column(Integer)
    ct = Column(Integer, default=timestamp())



