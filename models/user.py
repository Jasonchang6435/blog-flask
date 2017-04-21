from . import *
import models.base as base


Base = base.Base
ModelMixin = base.ModelMixin


class User(Base, ModelMixin):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    password = Column(String(100))

