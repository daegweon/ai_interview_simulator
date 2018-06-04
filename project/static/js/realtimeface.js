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
            // Show formatted JSON on webpage.
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
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
            console.log("R: "+roll+" Y: " +yaw)
            
            
            //if(document.getElementById("checkPose").checked == true){
                if ((yaw < -15 || yaw > 15) || (roll < -15 || roll > 15)) banPoseToast();
            //}
            
            document.getElementById('value1').innerHTML = "화남: "+anger;
            document.getElementById('value2').innerHTML = "경멸: "+contempt;
            document.getElementById('value3').innerHTML = "싫음: "+disgust;
            document.getElementById('value4').innerHTML = "공포: "+fear;
            document.getElementById('value5').innerHTML = "행복: "+happiness;
            document.getElementById('value6').innerHTML = "중립: "+neutral;
            document.getElementById('value7').innerHTML = "슬픔: "+sadness;
            document.getElementById('value8').innerHTML = "놀람: "+surprise;

            if (anger > 0.5){ 
                document.getElementById('value1').style.zoom="110%";
                document.getElementById('icon1').style.visibility="visible";
                if(document.getElementById("checkAnger").checked == true) banEmotionToast("화남");
            }
            else{ document.getElementById('icon1').style.visibility="hidden"; document.getElementById('value1').style.zoom="100%";}
            if (contempt > 0.5){
                document.getElementById('value2').style.zoom="110%";
                document.getElementById('icon2').style.visibility="visible";
                if(document.getElementById("checkContempt").checked == true) banEmotionToast("경멸");
            }
            else{ document.getElementById('icon2').style.visibility="hidden"; document.getElementById('value2').style.zoom="100%";}
            if (disgust > 0.5){
                document.getElementById('value3').style.zoom="110%";
                document.getElementById('icon3').style.visibility="visible";
                if(document.getElementById("checkDisgust").checked == true) banEmotionToast("싫음");
            }
            else{ document.getElementById('icon3').style.visibility="hidden"; document.getElementById('value3').style.zoom="100%";}

            if (fear > 0.5){
                document.getElementById('value4').style.zoom="110%";
                document.getElementById('icon4').style.visibility="visible";
                if(document.getElementById("checkFear").checked == true) banEmotionToast("공포");
            }
            else{ document.getElementById('icon4').style.visibility="hidden"; document.getElementById('value4').style.zoom="100%";}

            if (happiness > 0.5){
                document.getElementById('value5').style.zoom="110%";
                document.getElementById('icon5').style.visibility="visible";
                if(document.getElementById("checkHappiness").checked == true) banEmotionToast("행복");
            }
            else{ document.getElementById('icon5').style.visibility="hidden"; document.getElementById('value5').style.zoom="100%";}

            if (neutral > 0.5){
                document.getElementById('value6').style.zoom="110%";
                document.getElementById('icon6').style.visibility="visible";
                if(document.getElementById("checkNeutral").checked == true) banEmotionToast("중립");
            }
            else{ document.getElementById('icon6').style.visibility="hidden";
             document.getElementById('value6').style.zoom="100%"; }

            if (sadness > 0.5){
                document.getElementById('value7').style.zoom="110%";
                document.getElementById('icon7').style.visibility="visible";
                if(document.getElementById("checkSadness").checked == true) banEmotionToast("슬픔");
            }
            else{ document.getElementById('icon7').style.visibility="hidden"; document.getElementById('value7').style.zoom="100%";}

            if (surprise > 0.5){
                document.getElementById('value8').style.zoom="110%";
                document.getElementById('icon8').style.visibility="visible";
                if(document.getElementById("checkSurprise").checked == true) banEmotionToast("놀람");
            }
            else{ document.getElementById('icon8').style.visibility="hidden"; document.getElementById('value8').style.zoom="110%";}
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