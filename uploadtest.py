import os
import sys
from google.cloud import storage

src_filename = 'Sound.wav'
dst_filename = 'testUpload.wav'

storage_client = storage.Client.from_service_account_json('key.json')   #key.json 이라는 service-account-key 파일이 있어야함.
bucket = storage_client.get_bucket('capdi_test')
blob = bucket.blob(dst_filename)

blob.upload_from_filename(src_filename)

print('File {} uploaded to {}.'.format(
    src_filename,
    dst_filename))