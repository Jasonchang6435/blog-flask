from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
from utils import PROJECT_DIR
import os.path

Base = declarative_base()
TASK_DB_URI = 'sqlite:///' + os.path.join(PROJECT_DIR, 'blog-flask.sqlite3')
print(TASK_DB_URI)
engine = create_engine(TASK_DB_URI, echo=True)
session = scoped_session(sessionmaker())


class ModelMixin(object):
    @classmethod
    def create(cls, form):
        status, data, msgs = False, {}, []
        m = cls(**form)
        session.add(m)
        session.commit()
        status = True
        data[cls.name()] = m.column_dict()
        return status, data, msgs

    @classmethod
    def delete(cls, **kwargs):
        status, data, msgs = False, {}, []
        ms = session.query(cls).filter_by(**kwargs)
        for m in ms:
            session.remove(m)
        status = True
        data[cls.name()] = [m.column_dict() for m in ms]
        return status, data, msgs

    @classmethod
    def all(cls):
        status, data, msgs = False, {}, []
        ms = session.query(cls).all()
        status = True
        data[cls.name()] = [m.column_dict() for m in ms]
        return status, data, msgs

    @classmethod
    def retrieve(cls, **kwargs):
        status, data, msgs = False, {}, []
        m = session.query(cls).filter_by(**kwargs).first()
        if m is not None:
            status = True
            data[cls.name()] = m.column_dict()
        else:
            msgs.append('没有此项')
        return status, data, msgs

    @classmethod
    def update(cls, model_id, form):
        status, data, msgs = False, {}, []
        m = session.query(cls).filter_by(model_id).first()
        m.update(form)
        status = True
        data[cls.name()] = m.column_dict()
        return m

    @classmethod
    def retrieve_all(cls, **kwargs):
        status, data, msgs = False, {}, []
        ms = session.query(cls).filter_by(**kwargs).all()
        status = True
        data[cls.name()] = [m.column_dict() for m in ms]
        return status, data, msgs

    def __repr__(self):
        class_name = self.__class__.__name__
        properties = ('{} = {}'.format(k, v) for k, v in self.__dict__.items())
        return '<{}: \n  {}\n>'.format(class_name, '\n  '.join(properties))

    def remove(self):
        session.delete(self)
        # 逻辑删除
        # self.deleted = True
        # self.save()

    def column_dict(self):
        d = dict(self.__dict__)
        d.pop('_sa_instance_state')
        return d

    @classmethod
    def name(cls):
        return cls.__name__.lower()


def init_db():
    session.remove()
    session.configure(bind=engine, autoflush=False, expire_on_commit=False)
    print('initialize db completed')


def create_db():
    init_db()
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    create_db()
