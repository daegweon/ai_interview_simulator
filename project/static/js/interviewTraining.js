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
var recordedBlobs;
var sourceBuffer;
var timer;
var face;
var questionCount = 0;

var gumVideo = document.querySelector('video#gum');

var recordButton = document.querySelector('button#record');
var camOnOffButton = document.querySelector('button#camOnOff');
var snapshotCanvas = document.getElementById('snapshot');
var context = snapshot.getContext('2d');
recordButton.onclick = toggleRecording;
//camOnOffButton.onclick = ToggleWebCam;

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

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    //recordedBlobs.push(event.data);
  }
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

function toggleRecording() {
  if (recordButton.textContent === '면접 시작' || recordButton.textContent === '다음 문제') {
    startSpeechToText();
    document.getElementById("question").textContent = ques_text[questionCount]
    startTick();
    startRecording();
    StartDetectFace();
  } else {
    stopSpeechToText();
    stopTick();
    stopRecording();
    StopDetectFace();
    questionCount += 1;
    if (questionCount == 5) {
      questionCount = 0;
      recordButton.disabled = true;
      document.getElementById("finInterview").style.display = "inline";
      recordButton.textContent = '면접 종료';
    }
    else {
      recordButton.textContent = '다음 문제';
    }
  }
}

function startRecording() {
  recordedBlobs = [];
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
  mediaRecorder.start(1000); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
}

function StartDetectFace() {
  face = setInterval(function () {
    // Draw the video frame to the canvas.
    context.drawImage(gumVideo, 0, 0, snapshotCanvas.width,
      snapshotCanvas.height);
    var dataUrl = snapshotCanvas.toDataURL('image/png');
    var blob = dataURItoBlob(dataUrl);
    processImage(blob)
  }, 1000); //set time interval ms
}

function StopDetectFace(){
  clearInterval(face);
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
      if (data === 'good') alert('complete');
      else alert('??');
    }
  });
  return false;
}
/*
function ToggleWebCam() {
  if (camOnOffButton.textContent === '카메라 OFF') {
    camOnOffButton.textContent = '카메라 ON';
    document.getElementById("gum").style.visibility = "hidden";
  } else {
    document.getElementById("gum").style.visibility = "";
    camOnOffButton.textContent = '카메라 OFF';
  }
}*/