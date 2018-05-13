import os
import sys
import json
from google.cloud import storage
import subprocess

src_filename = 'testaudio.m4a'
dst_filename = 'testUpload.m4a'

#구글 스토리지 업로드
#storage_client = storage.Client.from_service_account_json('key.json')   #key.json 이라는 service-account-key 파일이 있어야함.
#bucket = storage_client.get_bucket('capdi_test')
#blob = bucket.blob(dst_filename)

#blob.upload_from_filename(src_filename)

print('File {} uploaded to {}.'.format(
    src_filename,
    dst_filename))
# Speech to text 요청
#result = json.loads(subprocess.check_output("gcloud ml speech recognize-long-running gs://capdi_test/testUpload2.m4a --language-code=ko-KR --encoding=linear16 --sample-rate=48000 --async", shell=True))
#result = json.loads(subprocess.check_output("gcloud ml speech recognize-long-running gs://capdi_test/testUpload3.flac --language-code=ko-KR --async", shell=True))
# 결과 대기 후 출력
#result2 = subprocess.check_output("gcloud ml speech operations wait %s"%result['name'],shell=True)
result2 = json.loads(subprocess.check_output("gcloud ml speech operations wait 1912905154630698383",shell=True))
print(result2['results'][0]['alternatives'][0]['transcript'])