import models.base as base


session = base.session


class ModelMixin(object):
    @classmethod
    def create(cls, form):
        m = cls(**form)
        session.add(m)
        session.commit()
        return m

    @classmethod
    def delete(cls, **kwargs):
        ms = session.query(cls).filter_by(**kwargs)
        for m in ms:
            session.remove(m)
        return ms

    @classmethod
    def all(cls):
        ms = session.query(cls).all()
        return ms

    @classmethod
    def retrieve(cls, **kwargs):
        m = session.query(cls).filter_by(**kwargs).first()
        return m

    @classmethod
    def update(cls, model_id, form):
        m = session.query(cls).filter_by(model_id).first()
        m.update(form)
        return m

    @classmethod
    def retrieve_all(cls, **kwargs):
        ms = session.query(cls).filter_by(**kwargs).all()
        return ms

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