/*
1. 파일명: realtimeface.js
2. 저자 : Human Learning
3. 목적 : 연습 면접 시 실시간으로 Face API에 요청하고 값을 받아 피드백을 처리
4. 참조 : Bootstrap Notify(v.3.1.5) , Face API Docs, StackOverflow
5. 제한(restriction) : Face API에 대한 subscription key 필요
*/

var subscriptionKey = "";   //api key
var headposeThreshold = 150; //고개의 기울기 기준값
var emotionThreshold = 500; //감정 기준값
var emoticonThreshold1 = 900;   //이모티콘 기준값 1
var emoticonThreshold2 = 700;   //이모티콘 기준값 2
var emoticonThreshold3 = 450;   //이모티콘 기준값 3
var emoticonThreshold4 = 200;   //이모티콘 기준값 4

//token을 얻기 위해 쿠키를 받아오는 함수
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//API Key를 요청하는 함수
function getKey() {
    var csrftoken = getCookie('csrftoken');

    var formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrftoken);

    $.ajax({
        url: '/interviews/getSubKey/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        async: false,
    }).done(function (data) {
        subscriptionKey = data['subKey'];
    });
}

//진행했던 실시간 분석 결과를 제공하기 위한 변수
var banEmotionList = [];
var banEmotionCount = [0, 0, 0, 0, 0, 0, 0, 0];

function processImage(data) {

    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "headPose,emotion",
    };

    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: data,
        processData: false,
        contentType: false,
        async: true
    })

        .done(function (data) {
            try {
                //각 감정 값 parsing
                var anger = data[0]['faceAttributes']['emotion']['anger'] * 1000;
                var contempt = data[0]['faceAttributes']['emotion']['contempt'] * 1000;
                var disgust = data[0]['faceAttributes']['emotion']['disgust'] * 1000;
                var fear = data[0]['faceAttributes']['emotion']['fear'] * 1000;
                var happiness = data[0]['faceAttributes']['emotion']['happiness'] * 1000;
                var neutral = data[0]['faceAttributes']['emotion']['neutral'] * 1000;
                var sadness = data[0]['faceAttributes']['emotion']['sadness'] * 1000;
                var surprise = data[0]['faceAttributes']['emotion']['surprise'] * 1000;
                var pitch = data[0]['faceAttributes']['headPose']['pitch'] * 10;
                var roll = data[0]['faceAttributes']['headPose']['roll'] * 10;
                var yaw = data[0]['faceAttributes']['headPose']['yaw'] * 10;

                //실시간 감정 현황을 이미지로 보여줌
                angerChange(anger);
                contemptChange(contempt);
                disgustChange(disgust);
                fearChange(fear);
                happinessChange(happiness);
                neutralChange(neutral);
                sadnessChange(sadness);
                surpriseChange(surprise);

                //금지 감정 선택시, 해당 감정이 감지되었을 때 알림 및 결과 누적
                if (document.getElementById('checkAnger').checked && anger > emotionThreshold) {
                    //banEmotionToast("화남");
					notification(3, "화남");
                    banEmotionCount[0] += 1;
                    if (banEmotionCount[0] == 1) banEmotionList.push('화남');
                }
                if (document.getElementById('checkContempt').checked && contempt > emotionThreshold) {
                    //banEmotionToast("경멸");
					notification(3, "경멸");
                    banEmotionCount[1] += 1;
                    if (banEmotionCount[1] == 1) banEmotionList.push('경멸');
                }
                if (document.getElementById('checkDisgust').checked && disgust > emotionThreshold) {
                    //banEmotionToast("싫음");
					notification(3, "싫음");
                    banEmotionCount[2] += 1;
                    if (banEmotionCount[2] == 1) banEmotionList.push('싫음');
                }
                if (document.getElementById('checkFear').checked && fear > emotionThreshold) {
                    //banEmotionToast("공포");
					notification(3, "공포");
                    banEmotionCount[3] += 1;
                    if (banEmotionCount[3] == 1) banEmotionList.push('공포');
                }
                if (document.getElementById('checkHappiness').checked && happiness > emotionThreshold) {
                    //banEmotionToast("행복");
					notification(3, "행복");
                    banEmotionCount[4] += 1;
                    if (banEmotionCount[4] == 1) banEmotionList.push('행복');
                }
                if (document.getElementById('checkNeutral').checked && neutral > emotionThreshold) {
                    //banEmotionToast("중립");
					notification(3, "중립");
                    banEmotionCount[5] += 1;
                    if (banEmotionCount[5] == 1) banEmotionList.push('중립');
                }
                if (document.getElementById('checkSadness').checked && sadness > emotionThreshold) {
                    //banEmotionToast("슬픔");
					notification(3, "슬픔");
                    banEmotionCount[6] += 1;
                    if (banEmotionCount[6] == 1) banEmotionList.push('슬픔');
                }
                if (document.getElementById('checkSurprise').checked && surprise > emotionThreshold) {
                    //banEmotionToast("놀람");
					notification(3, "놀람");
                    banEmotionCount[7] += 1;
                    if (banEmotionCount[7] == 1) banEmotionList.push('놀람');
                }

                //고개가 일정 기준 이상 기울어져 있을 때 알림
                if (yaw > Math.abs(headposeThreshold) || roll > Math.abs(headposeThreshold)){
					//banPoseToast();
					notification(2);
				} 

            } catch (exception) {
                // 얼굴 인식 오류시 에러 알림
				// errorToast();
				notification(1);
            }

        })

        .fail(function (jqXHR, textStatus, errorThrown) {
        	// 기타 연결 오류시 에러 알림    
			//errorToast();
			notification(1);
        });
};

//값에 따른 화남 감정 이모티콘 변경
function angerChange(emotion) {
    var emo = document.getElementById('anger');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/a4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/a3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/a2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/a1.png'; }
    else { emo.src = '/static/img/emoticon/a0.png'; }
}

//값에 따른 경멸 감정 이모티콘 변경
function contemptChange(emotion) {
    var emo = document.getElementById('contempt');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/c4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/c3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/c2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/c1.png'; }
    else { emo.src = '/static/img/emoticon/c0.png'; }
}

//값에 따른 싫음 감정 이모티콘 변경
function disgustChange(emotion) {
    var emo = document.getElementById('disgust');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/d4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/d3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/d2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/d1.png'; }
    else { emo.src = '/static/img/emoticon/d0.png'; }
}

//값에 따른 공포 감정 이모티콘 변경
function fearChange(emotion) {
    var emo = document.getElementById('fear');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/f4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/f3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/f2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/f1.png'; }
    else { emo.src = '/static/img/emoticon/f0.png'; }
}

//값에 따른 행복 감정 이모티콘 변경
function happinessChange(emotion) {
    var emo = document.getElementById('happiness');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/h4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/h3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/h2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/h1.png'; }
    else { emo.src = '/static/img/emoticon/h0.png'; }
}

//값에 따른 중립 감정 이모티콘 변경
function neutralChange(emotion) {
    var emo = document.getElementById('neutral');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/n4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/n3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/n2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/n1.png'; }
    else { emo.src = '/static/img/emoticon/n0.png'; }
}

//값에 따른 슬픔 감정 이모티콘 변경
function sadnessChange(emotion) {
    var emo = document.getElementById('sadness');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/s4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/s3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/s2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/s1.png'; }
    else { emo.src = '/static/img/emoticon/s0.png'; }
}

//값에 따른 화남 놀람 이모티콘 변경
function surpriseChange(emotion) {
    var emo = document.getElementById('surprise');

    if (emotion >= emoticonThreshold1) { emo.src = '/static/img/emoticon/p4.png'; }
    else if (emotion >= emoticonThreshold2) { emo.src = '/static/img/emoticon/p3.png'; }
    else if (emotion >= emoticonThreshold3) { emo.src = '/static/img/emoticon/p2.png'; }
    else if (emotion >= emoticonThreshold4) { emo.src = '/static/img/emoticon/p1.png'; }
    else { emo.src = '/static/img/emoticon/p0.png'; }
}