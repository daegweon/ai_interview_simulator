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
            //document.getElementById("result").innerHTML = temp;
            var dataset = [];
            dataset.push(anger);
            dataset.push(contempt);
            dataset.push(disgust);
            dataset.push(fear);
            dataset.push(happiness);
            dataset.push(neutral);
            dataset.push(sadness);
            dataset.push(surprise);
            var progress = document.getElementById('animationProgress');
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise"],
                    datasets: [{
                        label: 'Emotion',
                        data: dataset,
                        backgroundColor: [
                            'rgba(244, 67, 54, 0.7)',
                            'rgba(156, 39, 176, 0.7)',
                            'rgba(38, 198, 218, 0.7)',
                            'rgba(38, 166, 154, 0.7)',
                            'rgba(255, 238, 88, 0.7)',
                            'rgba(236, 64, 122, 0.7)',
                            'rgba(224, 224, 224, 0.7)',
                            'rgba(92, 107, 192, 0.7)'

                        ],
                        borderColor: [
                            'rgba(244, 67, 54, 1)',
                            'rgba(156, 39, 176, 1)',
                            'rgba(38, 198, 218, 1)',
                            'rgba(38, 166, 154, 1)',
                            'rgba(255, 238, 88, 1)',
                            'rgba(236, 64, 122, 1)',
                            'rgba(224, 224, 224, 1)',
                            'rgba(92, 107, 192, 1)'
                        ],
                        borderWidth: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#03A9F4',
                                fontSize: 18,
                                fontStyle: "normal",
                                fontFamily: "tahoma"
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 1,
                                stepSize: 0
                            }
                        }]
                    },
                    animation: {
                        duration: 4000,// general animation time
                    },
                    hover: {
                        animationDuration: 4000, // duration of animations when hovering an item
                    },
                    responsiveAnimationDuration: 4000, // animation duration after a resize
                },
            });
            //myChart.data.datasets[0].data = tmpdataset;
            //myChart.update();
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