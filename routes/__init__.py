from flask import Blueprint
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import session
from flask import url_for
from flask import abort
import json
import time


def log(*args, **kwargs):
    # time.time() 返回 unixtime
    # unixtime 格式转换
    f = '%Y/%m/%d %H:%M:%S'
    value = time.localtime(int(time.time()))
    dt = time.strftime(f, value)
    print(dt, *args, **kwargs)


def iv_json_response(status, data, msgs):
    d = dict(
        success=status,
        data=data,
        msgs=msgs,
    )
    r = json.dumps(d, ensure_ascii=False)
    return r
