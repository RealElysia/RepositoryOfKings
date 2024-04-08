import pytest
from requsetFunc.scripts import *


HOST = "https://www.zhihu.com"


def test_zhihu_json():
    data = load_data('../testData/data.json')
    url = HOST + data['url']
    request_data = data['requestData']
    result = post_api(url, data['header'], request_data)
    assert result['code'] == 400
    assert result['message'] == '该问题已存在'


def test_zhihu_form():
    data = load_data('../testData/zhihu.json')
    url = HOST + data['url']
    request_data = data['requestData']
    result = post_api(url, data['header'], request_data)
    assert result['success'] is True


def test_zhihu_get():
    url = HOST + '/commercial_api/banners_v3/home_up?'
    header = {
    "cookie": "_zap=bb7e1f1a-f9f2-44fc-a000-48b669de7619; d_c0=AAAaZt8iQhiPTjnskH1XIeT2E1DFHEnZkeA=|1709535187; __snaker__id=Pi9fUGlBjfSlF3HR; gdxidpyhxdE=kr1AnO%2BorIRLjyVqUwOwcM7PZXtDEkjWDpQk8e5aMiy68oiTHNc8P%5CesE6lMSA5O%2BGYXKBos2QG%2FvSVxpVYGOQIVgw%2FJg1%2Bjg23Z%2Br10VxY%2BeUOXrdWBKuqlk%2Bkqq5B5gX8X%2FjIzf8EeCvroUq%2BtDIf2X3zPS%2By%2Fjxy81U%2B4yRrBo3uW%3A1709692406182; captcha_session_v2=2|1:0|10:1709691549|18:captcha_session_v2|88:NzBhRlJadkF4cDIzbXBjbWFrSUVRZkVVQU1XWWV1ZWs5TVNPcHhaVFVXSTVvbHhKWWpIVE9MSStMcFpidnRDNg==|cc7aff7e434ad0b33c523557c9bd3e7ef0b5f0685a5452c991797774d92ac03e; q_c1=b4910ec896f543c5af56a2adec030be5|1709691576000|1709691576000; z_c0=2|1:0|10:1709706059|4:z_c0|92:Mi4xTDlZOVFnQUFBQUFBQUJwbTN5SkNHQmNBQUFCZ0FsVk51Q0RWWmdCVVZrZjZ5c1pwd196VzBOM0xxT3ltREp2cHFn|9e008898cc7f214ffb93ded4cc17436bd7be768541419729dc8eaec167fa259c; _xsrf=82235ae9-d0fc-4eaa-a1b0-10530279636d; tst=r; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1711504620,1711616337,1711959365,1712024382; SESSIONID=l9dxmo4ByQ1CcCgXtxhZjIwTDP7bBLuFk0no1ga9vnF; JOID=VFEXA0NWWHbXBdepUlBZLrvu8-pONWoQp2a3lhIhBkyWbprBAWw6d7cE06BY8_2bYvfpERYGVjGhS-uhkMif6hc=; osd=U18SA0tRVnPXDdCnV1BRKbXr8-JJO28Qr2G5kxIpAUKTbpLGD2k6f7AK1qBQ9POeYv_uHxMGXjavTuupl8aa6h8=; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1712024504; KLBRSID=d1f07ca9b929274b65d830a00cbd719a|1712024868|1712024379",
    "content-type": "application/json"
  }
    res = get_api(url, header)
    assert len(res['banner']) != 0


if __name__ == '__main__':
    pytest.main(['--html=LuBan.html'])