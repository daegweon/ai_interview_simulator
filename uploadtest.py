import os
import sys
from google.cloud import storage


os.system('gcloud auth activate-service-account --key-file key.json')

storage_client = storage.Client()
bucket = storage_client.get_bucket('capdi_test')
blob = bucket.blob('testUpload.m4a')

blob.upload_from_filename('Sound.wav')

print('File {} uploaded to {}.'.format(
    'Sound.wav',
    'testUpload.wav'))