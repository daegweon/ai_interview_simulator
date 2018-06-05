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

                var checkAnger = document.getElementById('checkAnger').checked;
                var checkContempt = document.getElementById('checkContempt').checked;
                var checkDisgust = document.getElementById('checkDisgust').checked;
                var checkFear = document.getElementById('checkFear').checked;
                var checkHappiness = document.getElementById('checkHappiness').checked;
                var checkNeutral = document.getElementById('checkNeutral').checked;
                var checkSadness = document.getElementById('checkSadness').checked;
                var checkSurprise = document.getElementById('checkSurprise').checked;

                var angerReturn = document.getElementById('anger');
                var contemptReturn = document.getElementById('contempt');
                var disgustReturn = document.getElementById('disgust');
                var fearReturn = document.getElementById('fear');
                var happinessReturn = document.getElementById('happiness');
                var neutralReturn = document.getElementById('neutral');
                var sadnessReturn = document.getElementById('sadness');
                var surpriseReturn = document.getElementById('surprise');


                if (checkAnger == true) { angerChange(anger); if (anger > 0.5) { banEmotionToast("화남"); } }
                else { angerReturn.src = '/static/img/emoticon/a4.png'; }

                if (checkContempt == true) { contemptChange(contempt); if (contempt > 0.5) { banEmotionToast("경멸"); } }
                else { contemptReturn.src = '/static/img/emoticon/c4.png'; }

                if (checkDisgust == true) { disgustChange(disgust); if (disgust > 0.5) { banEmotionToast("싫음"); } }
                else { disgustReturn.src = '/static/img/emoticon/d4.png'; }

                if (checkFear == true) { fearChange(fear); if (fear > 0.5) { banEmotionToast("공포"); } }
                else { fearReturn.src = '/static/img/emoticon/f4.png'; }

                if (checkHappiness == true) { happinessChange(happiness); if (happiness > 0.5) { banEmotionToast("행복"); } }
                else { happinessReturn.src = '/static/img/emoticon/h4.png'; }

                if (checkNeutral == true) { neutralChange(neutral); if (neutral > 0.5) { banEmotionToast("중립"); } }
                else { neutralReturn.src = '/static/img/emoticon/n4.png'; }

                if (checkSadness == true) { sadnessChange(sadness); if (sadness > 0.5) { banEmotionToast("슬픔"); } }
                else { sadnessReturn.src = '/static/img/emoticon/s4.png'; }

                if (checkSurprise == true) { surpriseChange(surprise); if (surprise > 0.5) { banEmotionToast("놀람"); } }
                else { surpriseReturn.src = '/static/img/emoticon/p4.png'; }


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