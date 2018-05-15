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

var gumVideo = document.querySelector('video#gum');

var recordButton = document.querySelector('button#record');
var camOnOffButton = document.querySelector('button#camOnOff');
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

function stopTick(){
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
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  if (recordButton.textContent === '면접 시작') {
    startTick();
    startRecording();
  } else {
    stopTick();
    stopRecording();
    recordButton.textContent = '면접 시작';
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
  recordButton.textContent = '다음 문제';
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  download();
}


function download() {
  var blob = new Blob(recordedBlobs, { type: 'video/webm' });
  var file = new File([blob], 'filename.webm', {
    type: 'video/webm'
  });

  var csrftoken = getCookie('csrftoken');

  var formData = new FormData();
  formData.append('file', file);
  formData.append('csrfmiddlewaretoken', csrftoken);
  uploadToServer(formData);
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
      alert('complete');
    }
  });
  return false;
}

function ToggleWebCam(){
  if (camOnOffButton.textContent === '카메라 OFF') {
    camOnOffButton.textContent = '카메라 ON';
    document.getElementById("gum").style.visibility="hidden";
  } else {
    document.getElementById("gum").style.visibility="";
    camOnOffButton.textContent = '카메라 OFF';
  }
}