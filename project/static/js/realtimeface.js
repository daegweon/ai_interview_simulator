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

var banEmotionList=[];
var banEmotionCount=[0,0,0,0,0,0,0,0];

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
			
		
			if(checkAnger == true){ angerChange(anger); }
			else{ angerReturn.src = '/static/img/emoticon/a9.png'; }
		
			if(checkContempt == true){ contemptChange(contempt); }
			else{ contemptReturn.src = '/static/img/emoticon/c9.png'; }
		
			if(checkDisgust == true){ disgustChange(disgust); }
			else{ disgustReturn.src = '/static/img/emoticon/d9.png'; }
		
			if(checkFear == true){ fearChange(fear); }
			else{ fearReturn.src = '/static/img/emoticon/f9.png'; }
		
			if(checkHappiness == true){	happinessChange(happiness);	}
			else{ happinessReturn.src = '/static/img/emoticon/h9.png'; }
		
			if(checkNeutral == true){ neutralChange(neutral); }
			else{ neutralReturn.src = '/static/img/emoticon/n9.png'; }
		
			if(checkSadness == true){ sadnessChange(sadness); }
			else{ sadnessReturn.src = '/static/img/emoticon/s9.png'; }
		
			if(checkSurprise == true){ surpriseChange(surprise); }
			else{ surpriseReturn.src = '/static/img/emoticon/p9.png'; }
		

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
                if(document.getElementById("checkAnger").checked == true){
                    banEmotionCount[0]+=1;
                    if(banEmotionCount[0]==1) banEmotionList.push('화남');
                    banEmotionToast("화남");
                }
            }
            else{ document.getElementById('icon1').style.visibility="hidden"; document.getElementById('value1').style.zoom="100%";}
            
            if (contempt > 0.5){
                document.getElementById('value2').style.zoom="110%";
                document.getElementById('icon2').style.visibility="visible";
                if(document.getElementById("checkContempt").checked == true){
                    banEmotionCount[1]+=1;
                    if(banEmotionCount[1]==1) banEmotionList.push('경멸');
                    banEmotionToast("경멸");
                }
            }
            else{ document.getElementById('icon2').style.visibility="hidden"; document.getElementById('value2').style.zoom="100%";}
            if (disgust > 0.5){
                document.getElementById('value3').style.zoom="110%";
                document.getElementById('icon3').style.visibility="visible";
                if(document.getElementById("checkDisgust").checked == true){
                    banEmotionCount[2]+=1;
                    if(banEmotionCount[2]==1) banEmotionList.push('싫음');
                    banEmotionToast("싫음");
                }
            }
            else{ document.getElementById('icon3').style.visibility="hidden"; document.getElementById('value3').style.zoom="100%";}

            if (fear > 0.5){
                document.getElementById('value4').style.zoom="110%";
                document.getElementById('icon4').style.visibility="visible";
                if(document.getElementById("checkFear").checked == true){
                    banEmotionCount[3]+=1;
                    if(banEmotionCount[3]==1) banEmotionList.push('공포');
                    banEmotionToast("공포");
                }
            }
            else{ document.getElementById('icon4').style.visibility="hidden"; document.getElementById('value4').style.zoom="100%";}

            if (happiness > 0.5){
                document.getElementById('value5').style.zoom="110%";
                document.getElementById('icon5').style.visibility="visible";
                if(document.getElementById("checkHappiness").checked == true){
                    banEmotionCount[4]+=1;
                    if(banEmotionCount[4]==1) banEmotionList.push('행복');
                    banEmotionToast("행복");
                }
            }
            else{ document.getElementById('icon5').style.visibility="hidden"; document.getElementById('value5').style.zoom="100%";}

            if (neutral > 0.5){
                document.getElementById('value6').style.zoom="110%";
                document.getElementById('icon6').style.visibility="visible";
                if(document.getElementById("checkNeutral").checked == true){
                    banEmotionCount[5]+=1;
                    if(banEmotionCount[5]==1) banEmotionList.push('중립');
                    banEmotionToast("중립");
                }
            }
            else{ document.getElementById('icon6').style.visibility="hidden";
             document.getElementById('value6').style.zoom="100%"; }

            if (sadness > 0.5){
                document.getElementById('value7').style.zoom="110%";
                document.getElementById('icon7').style.visibility="visible";
                if(document.getElementById("checkSadness").checked == true){
                    banEmotionCount[6]+=1;
                    if(banEmotionCount[6]==1) banEmotionList.push('슬픔');
                    banEmotionToast("슬픔");
                }
            }
            else{ document.getElementById('icon7').style.visibility="hidden"; document.getElementById('value7').style.zoom="100%";}

            if (surprise > 0.5){
                document.getElementById('value8').style.zoom="110%";
                document.getElementById('icon8').style.visibility="visible";
                if(document.getElementById("checkSurprise").checked == true){
                    banEmotionCount[7]+=1;
                    if(banEmotionCount[7]==1) banEmotionList.push('놀람');
                    banEmotionToast("놀람");
                }
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

function angerChange(emotion){
		var emo = document.getElementById('anger');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/a9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/a8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/a7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/a6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/a5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/a4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/a3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/a2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/a1.png';}
    	else{ emo.src='/static/img/emoticon/a0.png';}
}

function contemptChange(emotion){
		var emo = document.getElementById('contempt');

		if(emotion>=0.9){ emo.src='/static/img/emoticon/c9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/c8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/c7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/c6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/c5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/c4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/c3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/c2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/c1.png';}
    	else{ emo.src='/static/img/emoticon/c0.png';}
}

function disgustChange(emotion){
		var emo = document.getElementById('disgust');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/d9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/d8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/d7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/d6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/d5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/d4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/d3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/d2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/d1.png';}
    	else{ emo.src='/static/img/emoticon/d0.png';}
}

function fearChange(emotion){
		var emo = document.getElementById('fear');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/f9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/f8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/f7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/f6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/f5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/f4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/f3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/f2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/f1.png';}
    	else{ emo.src='/static/img/emoticon/f0.png';}
}

function happinessChange(emotion){
		var emo = document.getElementById('happiness');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/h9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/h8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/h7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/h6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/h5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/h4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/h3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/h2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/h1.png';}
    	else{ emo.src='/static/img/emoticon/h0.png';}
}

function neutralChange(emotion){
		var emo = document.getElementById('neutral');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/n9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/n8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/n7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/n6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/n5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/n4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/n3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/n2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/n1.png';}
    	else{ emo.src='/static/img/emoticon/n0.png';}
}

function sadnessChange(emotion){
		var emo = document.getElementById('sadness');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/s9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/s8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/s7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/s6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/s5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/s4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/s3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/s2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/s1.png';}
    	else{ emo.src='/static/img/emoticon/s0.png';}
}

function surpriseChange(emotion){
		var emo = document.getElementById('surprise');
	
		if(emotion>=0.9){ emo.src='/static/img/emoticon/p9.png';}
    	else if(emotion>=0.8){ emo.src='/static/img/emoticon/p8.png';}
    	else if(emotion>=0.7){ emo.src='/static/img/emoticon/p7.png';}
    	else if(emotion>=0.6){ emo.src='/static/img/emoticon/p6.png';}
    	else if(emotion>=0.5){ emo.src='/static/img/emoticon/p5.png';}
    	else if(emotion>=0.4){ emo.src='/static/img/emoticon/p4.png';}
    	else if(emotion>=0.3){ emo.src='/static/img/emoticon/p3.png';}
    	else if(emotion>=0.2){ emo.src='/static/img/emoticon/p2.png';}
		else if(emotion>=0.1){ emo.src='/static/img/emoticon/p1.png';}
    	else{ emo.src='/static/img/emoticon/p0.png';}
}