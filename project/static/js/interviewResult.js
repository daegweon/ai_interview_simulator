function setTotalResult() {
    var totaltime = xAxis[5].length + xAxis[1].length + xAxis[2].length + xAxis[3].length + xAxis[4].length;
    var minute = parseInt(totaltime / 60);
    var second = totaltime % 60;
    var maxQuestionTime = Math.max(xAxis[5].length, xAxis[1].length, xAxis[2].length, xAxis[3].length, xAxis[4].length);
    var minQuestionTime = Math.min(xAxis[5].length, xAxis[1].length, xAxis[2].length, xAxis[3].length, xAxis[4].length);
    var totalEmotionFreq = emotionFreq.reduce(function (r, a) { //배열의 합
        a.forEach(function (b, i) {
            r[i] = (r[i] || 0) + b;
        });
        return r;
    }, []);
    var maxEmotionValue1 = totalEmotionFreq.indexOf(Math.max.apply(null, totalEmotionFreq));
    totalEmotionFreq.splice(maxEmotionValue1, 1);
    var maxEmotionValue2 = totalEmotionFreq.indexOf(Math.max.apply(null, totalEmotionFreq));
    if (Math.max.apply(null, totalEmotionFreq) == 0) { maxEmotionValue2 = -1; }
    totalEmotionFreq.splice(maxEmotionValue2, 1);
    var maxEmotionValue3 = totalEmotionFreq.indexOf(Math.max.apply(null, totalEmotionFreq));
    if (Math.max.apply(null, totalEmotionFreq) == 0) { maxEmotionValue3 = -1; }
    function emotionFunc(emotionvalue) {
        switch (emotionvalue) {
            case 0:
                return "화남";
                break;
            case 1:
                return "경멸";
                break;
            case 2:
                return "싫음";
                break;
            case 3:
                return "공포";
                break;
            case 4:
                return "행복";
                break;
            case 5:
                return "중립";
                break;
            case 6:
                return "슬픔";
                break;
            case 7:
                return "놀람";
                break;
            default:
                return "없음";
                break;
        }
    }
    var questionContent = "";
    mostWord = "<br>1위: '" + words[0]['tag'] + "'<br>" + "2위: '" + words[1]['tag'] + "'<br>" + "3위: '" + words[2]['tag'] + "'"
    for (var i = 1; i <= 5; i++) questionContent += "질문" + i + ": " + questionList[i - 1] + "<br>";
    document.getElementById("totalTime").innerHTML = "총 면접 시간 : " + minute + "분" + second + "초<br><br>";
    document.getElementById("questionContent").innerHTML = "출제된 문제는 다음과 같습니다.<br><br>"+questionContent+"<br>";
    document.getElementById("questionTime").innerHTML = "<br>길게 답변한 질문: " + parseInt(maxQuestionTime / 60) + "분 " + maxQuestionTime % 60 + "초<br>가장 짧게 답변한 질문: " + parseInt(minQuestionTime / 60) + "분 " + minQuestionTime % 60 + "초<br><br>";
    document.getElementById("best").innerHTML = "감정 빈도<br> 1위: " + emotionFunc(maxEmotionValue1) + "<br>2위: " + emotionFunc(maxEmotionValue2) + "<br>3위: " + emotionFunc(maxEmotionValue3) + "<br><br>단어 빈도:" + mostWord;
}

function setEmotionTrendResult() {
    var tempidx = 0;
    //첫인상 체크
    var first = 0;
    var temp = happinessList.slice(0, 3);
    for (var j = 0; j < temp.length; j++) first += 1000 * temp[j];
    if (first < 1500) {
        document.getElementById("ltext1").innerHTML += "면접에 있어서 첫인상이 중요해요. 웃는 표정을 지으며 시작하는 것은 어떨까요?<br>";
    }
    for (var i = 1; i <= 5; i++) {
        var anger = {
            x: xAxis[i],
            y: angerList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '화남'
        };
        var contempt = {
            x: xAxis[i],
            y: contemptList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '경멸'
        };
        var disgust = {
            x: xAxis[i],
            y: disgustList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '역겨움'
        };
        var fear = {
            x: xAxis[i],
            y: fearList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '공포'
        };
        var happiness = {
            x: xAxis[i],
            y: happinessList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '행복'
        };
        var neutral = {
            x: xAxis[i],
            y: neutralList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '중립'
        };
        var sadness = {
            x: xAxis[i],
            y: sadnessList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '슬픔'
        };
        var surprise = {
            x: xAxis[i],
            y: surpriseList.slice(tempidx, tempidx + xAxis[i].length),
            type: 'lines',
            name: '놀람'
        };
        var layout = {
            title: '감정 변화 추이',
            xaxis: {
                title: '시간'
            },
            yaxis: {
                title: '감정 비중'
            }
        }
        var data = [anger, contempt, disgust, fear, happiness, neutral, sadness, surprise];
        Plotly.newPlot('linechart' + i, data, layout);
        document.getElementById("question" + i).innerHTML = "질문 " + i + '. ' + questionList[i - 1];

        //질문에 대한 당황 체크
        var temp = happinessList.slice(tempidx, tempidx + 4);
        var value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = neutralList.slice(tempidx, tempidx + 4);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (2000 > value) {
            document.getElementById("ltext" + i).innerHTML += "이 질문에 당황한 흔적이 보여요. 이에 대한 대비가 필요하지 않을까요?<br>";
        }

        //행복도 체크
        temp = happinessList.slice(tempidx, tempidx + xAxis[i].length);
        value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (value > temp.length * 1000 * 0.5) document.getElementById("ltext" + i).innerHTML += "표정에서 행복함이 묻어나 보기 좋아요. 다만 때로는 진지한 모습을 보여주는 것도 좋아요!<br>";

        //슬픔 입꼬리 체크
        temp = sadnessList.slice(tempidx, tempidx + xAxis[i].length);
        value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (value > temp.length * 1000 * 0.1) document.getElementById("ltext" + i).innerHTML += "입꼬리가 내려간 모습은 좋지 않아요. 미소를 지어보는 것은 어떨까요?<br>";

        //마무리 할 때 체크
        temp = happinessList.slice(tempidx + xAxis[i].length - 4, tempidx + xAxis[i].length);
        value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = neutralList.slice(tempidx + xAxis[i].length - 4, tempidx + xAxis[i].length);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (2000 > value) {
            document.getElementById("ltext" + i).innerHTML += "답변을 마무리 할 때는 자신감있는 표정을 보이세요!<br>";
        }

        //화남, 경멸, 역겨움, 공포 체크
        temp = angerList.slice(tempidx, tempidx + xAxis[i].length);
        value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = contemptList.slice(tempidx, tempidx + xAxis[i].length);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = disgustList.slice(tempidx, tempidx + xAxis[i].length);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = fearList.slice(tempidx, tempidx + xAxis[i].length);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (value > temp.length * 1000 * 0.15) {
            document.getElementById("ltext" + i).innerHTML += "찡그리는 표정은 면접관에게 좋지 않은 인상을 심어줄 수 있어요. 조심!<br>";
        }

        //놀람 체크
        temp = surpriseList.slice(tempidx, tempidx + xAxis[i].length);
        value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (value > temp.length * 1000 * 0.15) document.getElementById("ltext" + i).innerHTML += "놀람이 예상보다 많이 나왔다면, 혹시 입을 크게 벌려서 얘기하고 계시지는 않나요?<br>";

        tempidx += xAxis[i].length;
    }

}

function setEmotionFrequencyResult() {
    for (var i = 1; i <= 5; i++) {
        var data = [{
            values: emotionFreq[i - 1],
            labels: ['화남', '경멸', '역겨움', '공포', '행복', '중립', '슬픔', '놀람'],
            type: 'pie',
            hoverinfo: 'label+percent',
        }];
        var layout = {
            title: '감정 빈도',
        }
        Plotly.newPlot('piechart' + i, data, layout);

        //무표정 100% 일 때
        var maxvalue = Math.max.apply(null, emotionFreq[i - 1]);
        if ((maxvalue > (xAxis[i].length * 0.9)) && (maxvalue == emotionFreq[i - 1][5])) {
            document.getElementById("ptext" + i).innerHTML += "무표정을 유지하고 계시네요. 조금씩은 웃는 표정을 지어보는게 어떨까요?<br>";
        }
        if ((maxvalue > (xAxis[i].length / 2)) && (maxvalue == emotionFreq[i - 1][4])) {
            document.getElementById("ptext" + i).innerHTML += "웃는 모습이 상당히 보기 좋아요!<br>";
        }
        if ((maxvalue < (xAxis[i].length / 2)) && (maxvalue >= (xAxis[i].length * 0.35))) {
            document.getElementById("ptext" + i).innerHTML += "다양한 감정을 보이고 계시네요. 당신의 감정 표현은 큰 장점이 될 수 있을 것 같아요!<br>";
        }
        if (maxvalue < (xAxis[i].length * 0.35)) {
            document.getElementById("ptext" + i).innerHTML += "감정 기복이 심한 것 같아요. 조금은 표정 관리를 해보는게 어떨까요?<br>";
        }
    }
}

function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);

$('.top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
});

