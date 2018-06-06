A.I. Interview Simulator (AIS) [![Build Status](https://travis-ci.org/daegweon/ai_interview_simulator.svg?branch=master)](https://travis-ci.org/daegweon/ai_interview_simulator)
======================
![alt text](https://github.com/daegweon/ai_interview_simulator/blob/master/project/static/img/mainpage.png)<br>
인공지능을 활용하여 저렴한 비용으로 최적의 모의 면접 환경을 제공합니다.<br>
실제 면접에 사용되는 질문 데이터베이스 활용<br>
실시간 피드백을 통한 면접 연습<br>
모의 면접에 대한 빠르고 객관적인 분석과 개선 방향 제시<br>
내역을 통해 자신의 성장하는 과정을 확인하는 것까지,<br>
언제! 어디서나! AIS와 함께! 면접 능력을 마음껏 향상해보세요!<br>

## 1. 프로젝트 소개
본 서비스는 면접을 대비 하기 위한 웹 서비스입니다.<br>
면접 준비를 위해 전문 컨설팅 회사, 대학일자리센터를 방문하기 지치셨다구요? 당장 저희 서비스를 이용해보세요!<br>
합리적인 가격과 편리한 서비스로 빠르게 면접을 대비하실 수 있습니다.<br>
저희 서비스에서는 '연습면접'과 '실전면접' 기능을 통해 서비스를 제공하고 있습니다.<br>
각 기능에 대한 자세한 설명은 아래에서 확인하실 수 있습니다.

### 연습면접
* 사용자는 실시간으로 자신의 표정과 사용한 단어에 대한 피드백을 받아 원하는 방향으로 면접 연습을 할 수 있습니다.
* 면접에서 보이고 싶지 않은 감정이나 단어를 설정하고 면접을 시작하면 해당 감정이나 단어가 감지될 경우 경고를 줍니다.
### 실전면접
* 실제 면접과 유사한 환경을 제공하기 위해 실시간 정보를 제공하지 않고, 면접 종료 후 사용자가 면접 환경에서 어떤 반응을 보였는지 분석합니다. 
* 면접을 진행하는 동안 사용자의 감정과 성향을 분석하고, 그 결과를 통해 면접의 방향성을 제시합니다. 
## 2. 프로젝트 가치
1. 인공지능을 통해 빠르고 객관적인 평가를 내리고, 웹 서비스를 기반으로 하여 언제 어디서나 이용할 수 있는 새로운 서비스입니다.
2. 비싼 비용을 들이지 않더라도 혼자서 면접 능력을 향상할 수 있는 기회를 제공합니다.
3. 취업 면접 대비 서비스에서 확장하여 대입 면접, 영어 면접 등 다양한 면접에 도움이 되는 서비스로 확장할 수 있습니다. 

## 3. 활용 API
1. Microsoft Face API<br>
![alt text](https://github.com/daegweon/ai_interview_simulator/blob/master/project/static/img/readme_training.png)<br> 
이미지에서 하나 이상의 사람 얼굴을 감지하고 이미지에서 얼굴이 있는 위치에 얼굴 사각형과 얼굴 특징의 기계 학습 기반 예측을 포함하는 얼굴 특성을 함께 표시합니다.<br>
얼굴 특성 기능 사용할 수 있는 기능은 연령, 감정, 성별, 자세, 미소, 수염 및 이미지의 각 얼굴에 대한 27개의 특징입니다.<br>
그리고 감정 인식을 통합하여 이미지에 있는 각 얼굴의 분노, 경멸, 혐오, 공포, 행복, 무표정, 슬픔, 놀라움 같은 일련의 감정에서 신뢰도를 반환합니다.<br>
본 서비스에서는 얼굴의 자세특징 및 감정 인식 결과를 활용하여 사용자에게 제공합니다.
자세한 사항은 문서를 참조하세요.<br><https://azure.microsoft.com/ko-kr/services/cognitive-services/face/>

2. Annyang speech API<br>
사용자가 음성 명령으로 사이트를 제어 할 수있게 해주는 초소형 자바 스크립트 SpeechRecognition 라이브러리입니다.<br>
annyang은 종속성이 없으며 단지 2KB 밖에되지 않으며, MIT 라이선스에 따라 사용 및 수정할 수 있습니다.<br>
자세한 사항은 문서를 참조하세요.<br><https://github.com/TalAter/annyang>

3. IBM Personality Insight<br>
글을 통해 사람의 개성, 필요, 가치관을 예측합니다.<br>
다수의 고객을 대상으로 개개인의 습관과 기호를 파악할 수 있습니다.<br>
>> #### Personality Insight API의 기능 
>> 1. 개인의 세세한 특성까지 파악
>> 2. 소비 취향 이해
>> 3. 맞춤형 고객 경험 제공

자세한 사항은 문서를 참조하세요.<br><https://www.ibm.com/watson/developercloud/personality-insights/api/v3/python.html?python>

## 4. Contributors
### Human Learning Team
1. 이원찬 quwieo@ajou.ac.kr
2. 고대권 kingkdg@ajou.ac.kr
3. 김하륜 khl9411@ajou.ac.kr
4. 양철주 ijn29@ajou.ac.kr
> 문의 사항이 있으시다면 메일로 연락주시기 바랍니다.