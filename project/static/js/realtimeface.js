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
            //$("#responseTextArea").val(JSON.stringify(data, null, 2));
            var anger = data[0]['faceAttributes']['emotion']['anger'];
            var contempt = data[0]['faceAttributes']['emotion']['contempt'];
            var disgust = data[0]['faceAttributes']['emotion']['disgust'];
            var fear = data[0]['faceAttributes']['emotion']['fear'];
            var happiness = data[0]['faceAttributes']['emotion']['happiness'];
            var neutral = data[0]['faceAttributes']['emotion']['neutral'];
            var sadness = data[0]['faceAttributes']['emotion']['sadness'];
            var surprise = data[0]['faceAttributes']['emotion']['surprise'];
            var temp = anger + "<br>" + contempt + "<br>" + disgust + "<br>" + fear + "<br>" + happiness + "<br>" + neutral + "<br>" + sadness + "<br>" + surprise + "<br>";
            document.getElementById("result").innerHTML = temp;
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