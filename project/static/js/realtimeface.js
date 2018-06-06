var subscriptionKey = "";

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
                console.log("R: " + roll + " Y: " + yaw)
				
				angerChange(anger);
				contemptChange(contempt);
				disgustChange(disgust);
				fearChange(fear);
				happinessChange(happiness);
				neutralChange(neutral);
				sadnessChange(sadness);
				surpriseChange(surprise);
				
                if (document.getElementById('checkAnger').checked) {  if (anger > 0.5) { banEmotionToast("화남"); } }
                if (document.getElementById('checkContempt').checked) { contemptChange(contempt); if (contempt > 0.5) { banEmotionToast("경멸"); } }
                if (document.getElementById('checkDisgust').checked) { disgustChange(disgust); if (disgust > 0.5) { banEmotionToast("싫음"); } }
                if (document.getElementById('checkFear').checked) { fearChange(fear); if (fear > 0.5) { banEmotionToast("공포"); } }
                if (document.getElementById('checkHappiness').checked) { happinessChange(happiness); if (happiness > 0.5) { banEmotionToast("행복"); } }
                if (document.getElementById('checkNeutral').checked) { neutralChange(neutral); if (neutral > 0.5) { banEmotionToast("중립"); } }
                if (document.getElementById('checkSadness').checked) { sadnessChange(sadness); if (sadness > 0.5) { banEmotionToast("슬픔"); } }
                if (document.getElementById('checkSurprise').checked) { surpriseChange(surprise); if (surprise > 0.5) { banEmotionToast("놀람"); } }

                //if(document.getElementById("checkPose").checked == true){
                if ((yaw < -15 || yaw > 15) || (roll < -15 || roll > 15)) banPoseToast();
                //}
            } catch(exception){
                errorToast();
            }

        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            /*var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);*/
            errorToast();
        });
};

function angerChange(emotion) {
    var emo = document.getElementById('anger');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/a4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/a3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/a2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/a1.png'; }
    else { emo.src = '/static/img/emoticon/a0.png'; }
}

function contemptChange(emotion) {
    var emo = document.getElementById('contempt');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/c4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/c3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/c2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/c1.png'; }
    else { emo.src = '/static/img/emoticon/c0.png'; }
}

function disgustChange(emotion) {
    var emo = document.getElementById('disgust');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/d4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/d3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/d2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/d1.png'; }
    else { emo.src = '/static/img/emoticon/d0.png'; }
}

function fearChange(emotion) {
    var emo = document.getElementById('fear');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/f4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/f3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/f2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/f1.png'; }
    else { emo.src = '/static/img/emoticon/f0.png'; }
}

function happinessChange(emotion) {
    var emo = document.getElementById('happiness');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/h4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/h3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/h2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/h1.png'; }
    else { emo.src = '/static/img/emoticon/h0.png'; }
}

function neutralChange(emotion) {
    var emo = document.getElementById('neutral');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/n4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/n3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/n2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/n1.png'; }
    else { emo.src = '/static/img/emoticon/n0.png'; }
}

function sadnessChange(emotion) {
    var emo = document.getElementById('sadness');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/s4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/s3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/s2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/s1.png'; }
    else { emo.src = '/static/img/emoticon/s0.png'; }
}

function surpriseChange(emotion) {
    var emo = document.getElementById('surprise');

    if (emotion >= 0.9) { emo.src = '/static/img/emoticon/p4.png'; }
    else if (emotion >= 0.7) { emo.src = '/static/img/emoticon/p3.png'; }
    else if (emotion >= 0.45) { emo.src = '/static/img/emoticon/p2.png'; }
    else if (emotion >= 0.2) { emo.src = '/static/img/emoticon/p1.png'; }
    else { emo.src = '/static/img/emoticon/p0.png'; }
}