/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

// This code is adapted from
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html

'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var sourceBuffer;
var timer;
var questionCount = 0;
var subscriptionKey ="";
var emotionList=[];
var gumVideo = document.querySelector('video#gum');

var recordButton = document.querySelector('button#record');
var camOnOffButton = document.querySelector('button#camOnOff');
var snapshotCanvas = document.getElementById('snapshot');
var context = snapshot.getContext('2d');
var face;
recordButton.onclick = toggleRecording;
camOnOffButton.onclick = ToggleWebCam;

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var constraints = {
  audio: true,
  video: true
};

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function startTick() {
  var countDownDate = new Date().getTime();

  // Update the count down every 1 second
  timer = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = now - countDownDate;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="timer"
    document.getElementById("timer").innerHTML = pad(minutes, 2) + ":" + pad(seconds, 2);

    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}

function stopTick() {
  clearInterval(timer)
}

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  gumVideo.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}


function handleDataAvailable(event) {

}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  if (recordButton.textContent === '면접 시작' || recordButton.textContent === '다음 문제') {
    startSpeechToText();
    document.getElementById("question").textContent = "질문" + (questionCount + 1) + ". " + ques_text[questionCount]
    startTick();
    startRecording();
    StartDetectFace();
  } else {
    recordButton.disabled = true;
    stopTick();
    StopDetectFace();
    questionCount += 1;
    setTimeout(function () {
      stopRecording();
      stopSpeechToText();
      if (questionCount == 5) { }
      else {
        recordButton.disabled = false;
        recordButton.textContent = '다음 문제';
      }
    }, 3000);
    if (questionCount == 5) {
      recordButton.disabled = true;
      document.getElementById("finInterview").style.display = "inline";
      recordButton.textContent = '면접 종료';
    }
    else {
      recordButton.textContent = '처리중';
    }
  }
}

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
    console.error('Exception while creating MediaRecorder: ' + e);
    alert('Exception while creating MediaRecorder: '
      + e + '. mimeType: ' + options.mimeType);
    return;
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = '답변 종료';
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  setData();
}

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


function setData() {

  var csrftoken = getCookie('csrftoken');

  var formData = new FormData();
  formData.append('emotionList', JSON.stringify(emotionList));
  formData.append('csrfmiddlewaretoken', csrftoken);
  formData.append('questionId', ques_id[questionCount - 1]);
  formData.append('questionCount', questionCount);
  formData.append('questionText', ques_text[questionCount - 1])
  formData.append('transcription', final_transcript);

  if (questionCount == 5) {
    formData.append('questionList', ques_id);
  }
  emotionList=[];
  uploadToServer(formData)
}

function uploadToServer(formData) {
  $.ajax({
    url: '/interviews/video-processing/',
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

function ToggleWebCam() {
  if (camOnOffButton.textContent === '카메라 OFF') {
    camOnOffButton.textContent = '카메라 ON';
    document.getElementById("gum").style.visibility = "hidden";
  } else {
    document.getElementById("gum").style.visibility = "";
    camOnOffButton.textContent = '카메라 OFF';
  }
}

function StartDetectFace() {
  face = setInterval(function () {
    // Draw the video frame to the canvas.
    context.drawImage(gumVideo, 0, 0, gumVideo.width,
      gumVideo.height);
    var dataUrl = snapshotCanvas.toDataURL('image/png');
    var blob = dataURItoBlob(dataUrl);
    processImage(blob)
  }, 1000); //set time interval ms
}

function StopDetectFace(){
  clearInterval(face);
}

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

function processImage(data) {

  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": 'emotion',
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
      var temp = [anger, contempt, disgust, fear, happiness, neutral, sadness, surprise];
      emotionList.push(temp);
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ?
        "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ?
        "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
          jQuery.parseJSON(jqXHR.responseText).message :
          jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
};