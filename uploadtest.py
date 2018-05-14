import os
import io
import sys
import json
from google.cloud import storage
import subprocess
from google.cloud import speech_v1p1beta1 as speech

client = speech.SpeechClient()

metadata = speech.types.RecognitionMetadata()
metadata.interaction_type = (speech.enums.RecognitionMetadata.InteractionType.PRESENTATION)

audio = speech.types.RecognitionAudio(uri='gs://capdi_test/testupload.flac')
config = speech.types.RecognitionConfig(encoding=speech.enums.RecognitionConfig.AudioEncoding.FLAC,
    sample_rate_hertz=16000,
    language_code='ko-KR',
    # Add this in the request to send metadata.
    metadata=metadata)

operation = client.long_running_recognize(config, audio)

response = operation.result(timeout=90)

for result in response.results:
    # The first alternative is the most likely one for this portion.
    print(u'Transcript: {}'.format(result.alternatives[0].transcript))
    print('Confidence: {}'.format(result.alternatives[0].confidence))
""" 
src_filename = 'testaudio.m4a'
dst_filename = 'testUpload.m4a'

storage_client = storage.Client.from_service_account_json('key.json')   #key.json 이라는 service-account-key 파일이 있어야함.
bucket = storage_client.get_bucket('capdi_test')
blob = bucket.blob(dst_filename)

blob.upload_from_filename(src_filename)

print('File {} uploaded to {}.'.format(
    src_filename,
    dst_filename))

# Speech to text 요청
#result = json.loads(subprocess.check_output("gcloud ml speech recognize-long-running gs://capdi_test/testupload.flac --language-code=ko-KR --encoding=flac --sample-rates=16000 --async", shell=True))

#분석이 끝날 때까지 대기하게 되므로 중간에 process 중간에 실행하게 될 경우 시간이 소요될 수 있음. 분석이 끝났는지 확인하기 위해서는 gcloud ml speech operations describe 활용
result2 = json.loads(subprocess.check_output("gcloud ml speech operations wait 7024684980943663976",shell=True))
for x in range(0,len(result2['results'])):
    print(result2['results'][x]['alternatives'][0]['transcript']) """