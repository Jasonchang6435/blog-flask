from . import *
import models.base as base
import models.modelmixin as modelmixin


Base = base.Base
ModelMixin = modelmixin.ModelMixin


# 定义User对象:
class User(Base, ModelMixin):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    password = Column(String(100))

