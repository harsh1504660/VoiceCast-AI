import requests
import os
import tempfile
def download_file(url):
    response = requests.get(url)
    if response.status_code == 200:
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        temp_file.write(response.content)
        temp_file.close()
        return temp_file.name
    else:
        raise Exception("Failed to download file:", response.status_code)
def upload_to_catbox(file_path):
    url = "https://catbox.moe/user/api.php"
    with open(file_path, 'rb') as f:
        files = {'fileToUpload': f}
        data = {'reqtype': 'fileupload'}
        response = requests.post(url, files=files, data=data)
    if response.ok:
        print(response.text.strip())
        return response.text.strip()
    else:
        print("❌ Upload failed:", response.status_code, response.text)
        return None
# filepath = download_file("https://files2.heygen.ai/aws_pacific/avatar_tmp/9d935c12b6ec4d1a8b93c506fc84b5d6/b04fc7cff7a44eef9b004cbaf43a6c58.mp4?Expires=1753615166&Signature=UM6a0SmhpEWioca66WDQ27mr9R~7bz7bUGR1-8OH0uDAVe72B6K0TXRwThFbt9SJtPXvly-hsPY7CHfj~3UUr0RlpNU29LKiZOUuneACqn5pCNjG6xr-kZtyjLPaksT8SCs-Q5YjbSkki1oTVweIz~-ZbVRsALp0FR6eIsVv6E~XGiFI0saItY407DTYx4XVHTxAcAKTGJ3Ybaaq4ni9YTZVyAdi~~al8LQt0mrE3RlU2k1PMgXMOeqL-D5rDfITn97rIqB6pJgxYidpDReMMADfm53m0nm-MTja9aUosIeQT2xTe6ErrdL~9dhZBH0FwR5OixaOVyisFFL41L4Dlg__&Key-Pair-Id=K38HBHX5LX3X2H")

# print("filepath : ",filepath)

# url = upload_to_catbox(filepath)

# print("url : ",url)