/*
1. 파일명: InterviewTraining.js
2. 저자 : Human Learning
3. 목적 : 연습 면접 진행. 사용자의 웹캠으로 부터 영상 및 음성 데이터 추출 
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

var webCam = document.querySelector('video#webCam');
var recordButton = document.querySelector('button#record');
var snapshotCanvas = document.getElementById('snapshot');
var context = snapshot.getContext('2d');

recordButton.onclick = toggleRecording;

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

//타이머 시작
function startTick() {
  var countDownDate = new Date().getTime();

  timer = setInterval(function () {

    var now = new Date().getTime();
    var distance = now - countDownDate;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = "&nbsp" + pad(minutes, 2) + ":" + pad(seconds, 2) + "&nbsp";

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
  console.log('getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
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

//면접 시작 버튼 함수
function toggleRecording() {
  if (recordButton.textContent === '면접 시작' || recordButton.textContent === '다음 문제') {
    startSpeechToText();
    document.getElementById("textTitle").textContent = "질문" + (questionCount + 1); 
    document.getElementById("question").textContent = ques_text[questionCount];    
    startTick();
    startRecording();
    StartDetectFace();
  } else {
    stopSpeechToText();
    stopTick();
    stopRecording();
    StopDetectFace();
    tipToast(questionCount);  //답변 완료시 면접에 관련된 팁 표시
    questionCount += 1;
    if (questionCount == 5) {
      questionCount = 0;
      recordButton.disabled = true;
      document.getElementById("finInterview").style.display = "inline";
      document.getElementById("finInterview").disabled = false;
      recordButton.textContent = '면접 종료';
    }
    else {
      recordButton.textContent = '다음 문제';
    }
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
  } catch (error) {
    console.error('creating MediaRecorder error: ' + error);
    return;
  }
  recordButton.textContent = '답변 종료';
  mediaRecorder.start();

  //감정 이모티콘 기본이미지로 설정
  document.getElementById('anger').src = '/static/img/emoticon/a0.png';
  document.getElementById('contempt').src = '/static/img/emoticon/c0.png';
  document.getElementById('disgust').src = '/static/img/emoticon/d0.png';
  document.getElementById('fear').src = '/static/img/emoticon/f0.png';
  document.getElementById('happiness').src = '/static/img/emoticon/h0.png';
  document.getElementById('neutral').src = '/static/img/emoticon/n0.png';
  document.getElementById('sadness').src = '/static/img/emoticon/s0.png';
  document.getElementById('surprise').src = '/static/img/emoticon/p0.png';
}

//영상 녹화 중단
function stopRecording() {
  mediaRecorder.stop();
}

//영상으로 부터 이미지를 추출해 감정 분석에 요청
function StartDetectFace() {
  face = setInterval(function () {
    context.drawImage(webCam, 0, 0, snapshotCanvas.width,
      snapshotCanvas.height);
    var dataUrl = snapshotCanvas.toDataURL('image/png');
    var blob = dataURItoBlob(dataUrl);
    processImage(blob)
  }, 500); //0.5초마다 수행
}

//감정 분석 요청 중지
function StopDetectFace() {
  clearInterval(face);
}

//연습 결과 요청
function getTrainingResult(banwordlist, banwordcount, banEmotionList, banEmotionCount) {
  var csrftoken = getCookie('csrftoken');

  var formData = new FormData();
  formData.append('csrfmiddlewaretoken', csrftoken);
  formData.append('banwordlist', banwordlist);
  formData.append('banwordcount', banwordcount);
  formData.append('banemotionlist', banEmotionList);
  formData.append('banemotioncount', banEmotionCount);

  $.ajax({
    type: "POST",
    url: '/interviews/training/result/',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      window.location.href = "/interviews/training/result/";
    }
  });
}