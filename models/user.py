from . import *
import models.base as base


Base = base.Base



# 定义User对象:
class User(Base, ModelMixin):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    password = Column(String(100))

