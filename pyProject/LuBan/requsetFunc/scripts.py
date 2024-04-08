import json
import os
import requests


def load_data(path):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            data = f.read()
        return json.loads(data)
    else:
        return '文件读取异常，请检查'


def get_api(url, header, params=None):
    if params:
        resp = requests.get(url=url, headers=header, params=params).json()
    else:
        resp = requests.get(url=url, headers=header).json()
    return resp


def post_api(url, header, data):
    if header['content-type'] == 'application/json':
        response = requests.post(url=url, headers=header, json=data).json()
    else:
        response = requests.post(url=url, headers=header, data=data).json()
    return response