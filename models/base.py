from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine


Base = declarative_base()
SQLITE_CONFIG = 'sqlite:////Users/xiongchui/blog-flask/blog-flask的副本.sqlite3'
engine = create_engine(SQLITE_CONFIG, echo=True)
session = scoped_session(sessionmaker())


def init_db():
    session.remove()
    session.configure(bind=engine, autoflush=False, expire_on_commit=False)
    print('initialize db completed')


def create_db():
    init_db()
    base.Base.metadata.drop_all(engine)
    base.Base.metadata.create_all(engine)
