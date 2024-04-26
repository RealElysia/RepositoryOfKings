import requests


def save_video(url):
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open('static/video_elysia.mp4', 'wb') as f:
                for chunk in response.iter_content(chunk_size=1024):
                    f.write(chunk)
        else:
            print('Error while downloading video from {}'.format(url))
    except Exception as e:
        print('下载错误')


if __name__ == '__main__':
    url = 'https://vod-static.miyoushe.com/1/43828081vodtranscq1500002267/7dfa3417387702304559648713/v.f270755.mp4'
    save_video(url)