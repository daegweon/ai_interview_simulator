import json
from google.cloud import storage
import subprocess

def speechProcessing(src_filename, dst_filename):

    storage_client = storage.Client.from_service_account_json('key.json')   #key.json 이라는 service-account-key 파일이 있어야함.
    bucket = storage_client.get_bucket('capdi_test')
    blob = bucket.blob(dst_filename)

    blob.upload_from_filename(src_filename)

    print('File {} uploaded to {}.'.format(
        src_filename,
        dst_filename))

    # Speech to text 요청
    result = json.loads(subprocess.check_output("gcloud ml speech recognize-long-running gs://capdi_test/testupload.flac --language-code=ko-KR --encoding=flac --sample-rate=48000 --async", shell=True))

    #분석이 끝날 때까지 대기하게 되므로 중간에 process 중간에 실행하게 될 경우 시간이 소요될 수 있음. 분석이 끝났는지 확인하기 위해서는 gcloud ml speech operations describe 활용
    result2 = json.loads(subprocess.check_output("gcloud ml speech operations wait %s"%result['name'],shell=True))
    transcription = ''
    for x in range(0,len(result2['results'])):
        transcription += result2['results'][x]['alternatives'][0]['transcript']
        print(result2['results'][x]['alternatives'][0]['transcript'])

    f=open("speechText.txt","w")
    f.write(transcription)
    f.close()

    return transcription