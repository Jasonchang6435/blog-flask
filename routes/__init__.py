from flask import Blueprint
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import session
from flask import url_for
from flask import abort

import time


def log(*args, **kwargs):
    # time.time() 返回 unixtime
    # unixtime 格式转换
    f = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(f, value)
    print(dt, *args, **kwargs)
