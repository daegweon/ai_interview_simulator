/*
1. 파일명: InterviewTest.js
2. 저자 : Human Learning
3. 목적 : 실전 면접 진행. 사용자의 웹캠으로 부터 영상 및 음성 데이터 추출 
4. 참조 : WebRTC, MediaSource , mediaRecorder
*/

/*
This source code contains copyrighted source code under BSD-style license.
Copyright (c) 2015 The WebRTC project authors. 
*/

'use strict';

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var sourceBuffer;
var timer;
var face;
var questionCount = 0;
var subscriptionKey = "";
var emotionList = [];
var headposeList = [];

var webCam = document.querySelector('video#webCam');
var recordButton = document.querySelector('button#record');
var camOnOffButton = document.querySelector('button#camOnOff');
var snapshotCanvas = document.getElementById('snapshot');
var context = snapshot.getContext('2d');

recordButton.onclick = toggleRecording;
camOnOffButton.onclick = ToggleWebCam;

//token을 만들기 위해 쿠키를 얻는 함수
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

//스트림 설정
var constraints = {
  audio: true,
  video: true
};

//타이머 두자리수 표시
function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function startTick() {
  var countDownDate = new Date().getTime();

  timer = setInterval(function () {

    var now = new Date().getTime();
    var distance = now - countDownDate;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = pad(minutes, 2) + ":" + pad(seconds, 2);

    // 10분 초과시 자동 종료
    if (minutes >= 10) {
      toggleRecording();
      alert('최대 시간을 초과했습니다.');
    }
  }, 1000);
}

//타이머 멈춤
function stopTick() {
  clearInterval(timer)
}

//비디오 권한을 획득했을 때
function handleSuccess(stream) {
  recordButton.disabled = false;
  window.stream = stream;
  webCam.srcObject = stream;
}

//비디오 권한 획득에 에러발생시
function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
}

//면접 시작
function toggleRecording() {
  if (recordButton.textContent === '면접 시작' || recordButton.textContent === '다음 문제') {
    startSpeechToText();
    
    document.getElementById("textTitle").textContent = "질문" + (questionCount + 1);
    document.getElementById("question").textContent = ques_text[questionCount];

    btnShow();
    startTick();
    startRecording();
    StartDetectFace();
  } else {
    recordButton.disabled = true; //데이터 처리 전까지 버튼 임시 비활성화
    stopTick();
    StopDetectFace();
    questionCount += 1;
    setTimeout(function () {
      stopRecording();
      stopSpeechToText();
      if (questionCount != 5) { 
        recordButton.disabled = false;
        recordButton.textContent = '다음 문제';
      } //마지막 질문이 아닐시 다음 질문이 제시되도록
    }, 3000);
    if (questionCount == 5) {
      recordButton.disabled = true;
      document.getElementById("finInterview").style.display = "inline";
      recordButton.textContent = '면접 종료';
    } //마지막 질문일 시 면접 종료 설정
    else {
      recordButton.textContent = '처리중';
    } //데이터 처리중
  }
}

//영상 녹화 시작
function startRecording() {
  var options = { mimeType: 'video/webm;codecs=vp9' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = { mimeType: 'video/webm;codecs=vp8' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = { mimeType: 'video/webm' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = { mimeType: 'video/mp4' };
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('creating MediaRecorder error: ' + error);
    return;
  }
  recordButton.textContent = '답변 종료';
  mediaRecorder.start();
}

//영상 녹화 중단
function stopRecording() {
  mediaRecorder.stop();
  setData();
}

//URL 형태의 이미지 파일을 Blob 형태로 변환
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var bb = new Blob([ab], { "type": mimeString });
  return bb;
}

//면접 분석 데이터를 요청하기 위해 formdata 설정
function setData() {

  var csrftoken = getCookie('csrftoken');

  var formData = new FormData();
  formData.append('emotionList', JSON.stringify(emotionList));
  formData.append('headposeList', JSON.stringify(headposeList));
  formData.append('csrfmiddlewaretoken', csrftoken);
  formData.append('questionId', ques_id[questionCount - 1]);
  formData.append('questionCount', questionCount);
  formData.append('questionText', ques_text[questionCount - 1])
  formData.append('transcription', final_transcript);

  if (questionCount == 5) {
    formData.append('questionList', ques_id);
  }
  emotionList = [];
  headposeList = [];
  uploadToServer(formData)
}

//서버에 데이터 업로드 요청
function uploadToServer(formData) {
  $.ajax({
    url: '/interviews/processing/',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    async: true,
    success: function (data) {
      if (data === 'good' && questionCount == 5) {
        document.getElementById("finInterview").disabled = false;
      }
    }
  });
  return false;
}

//카메라 On/Off 기능
function ToggleWebCam() {
  if (camOnOffButton.textContent === '카메라 OFF') {
    camOnOffButton.textContent = '카메라 ON';
    document.getElementById("webCam").style.visibility = "hidden";
  } else {
    document.getElementById("webCam").style.visibility = "";
    camOnOffButton.textContent = '카메라 OFF';
  }
}

//영상으로 부터 이미지를 추출해 감정 분석에 요청
function StartDetectFace() {
  face = setInterval(function () {
    context.drawImage(webCam, 0, 0, webCam.width,
      webCam.height);
    var dataUrl = snapshotCanvas.toDataURL('image/png');
    var blob = dataURItoBlob(dataUrl);
    processImage(blob)
  }, 1000);
}

//감정 분석 요청 중지
function StopDetectFace() {
  clearInterval(face);
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

//API에 이미지 분석 요청
function processImage(data) {

  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "headPose,emotion"
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
      // Show formatted JSON on webpage.
      var anger = data[0]['faceAttributes']['emotion']['anger'];
      var contempt = data[0]['faceAttributes']['emotion']['contempt'];
      var disgust = data[0]['faceAttributes']['emotion']['disgust'];
      var fear = data[0]['faceAttributes']['emotion']['fear'];
      var happiness = data[0]['faceAttributes']['emotion']['happiness'];
      var neutral = data[0]['faceAttributes']['emotion']['neutral'];
      var sadness = data[0]['faceAttributes']['emotion']['sadness'];
      var surprise = data[0]['faceAttributes']['emotion']['surprise'];
      var pitch = data[0]['faceAttributes']['headPose']['pitch'];
      var roll = data[0]['faceAttributes']['headPose']['roll'];
      var yaw = data[0]['faceAttributes']['headPose']['yaw'];

      var temp = [anger, contempt, disgust, fear, happiness, neutral, sadness, surprise]; //감정데이터
      var temp2 = [pitch, roll, yaw]; //고개 기울기 데이터
      emotionList.push(temp);
      headposeList.push(temp2);
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
      var errorString = (errorThrown === "") ?
        "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ?
        "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
          jQuery.parseJSON(jqXHR.responseText).message :
          jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    }); //에러 발생시
};
      
//문제가 5초동안 표시되도록
function btnShow(){
		recordButton.disabled = true;
		document.getElementById('again').disabled = false;
		document.getElementById("textTitle").style.display = "block";
        document.getElementById("question").style.display = "block";
        setTimeout(btnHide, 5000);
}

//문제 숨김
function btnHide(){
	document.getElementById("textTitle").style.display = "none";
    document.getElementById("question").style.display = "none";
	recordButton.disabled = false;
}

//문제 다시보기
function btnAgain(){
    btnShow();
	document.getElementById('again').disabled = true;
}

//면접 중단
function cancelInterview(ic) {
  var csrftoken = getCookie('csrftoken');

  var formData = new FormData();
  formData.append('csrfmiddlewaretoken', csrftoken);
  formData.append('interview_count', ic)
  $.ajax({
    url: '/interviews/cancel/',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    async: false,
  }).done(function (data) {

  });
}