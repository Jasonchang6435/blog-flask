import time
from sqlalchemy import Column, String, Integer, Text, Table, ForeignKey
from sqlalchemy.orm import relationship, backref


def timestamp():
    return int(time.time())


def log(*args, **kwargs):
    f = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(f, value)
    print(dt, *args, **kwargs)
