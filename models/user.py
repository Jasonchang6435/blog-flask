from . import *


Base = declarative_base()


# 定义User对象:
class User(Base, ModelMixin):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    password = Column(String(100))

