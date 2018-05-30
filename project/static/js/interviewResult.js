function setTotalResult() {
    var totaltime = xAxis[0].length + xAxis[1].length + xAxis[2].length + xAxis[3].length + xAxis[4].length;
    var minute = parseInt(totaltime / 60);
    var second = totaltime % 60;
    var maxQuestionTime = Math.max(xAxis[0].length, xAxis[1].length, xAxis[2].length, xAxis[3].length, xAxis[4].length);
    var minQuestionTime = Math.min(xAxis[0].length, xAxis[1].length, xAxis[2].length, xAxis[3].length, xAxis[4].length);
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
                return "역겨움";
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
    document.getElementById("totalTime").innerHTML = "총 면접 시간 : " + minute + "분" + second + "초<br><br>";
    document.getElementById("questionContent").innerHTML = "질문1:<br>질문2:<br>질문3:<br>질문4:<br>질문5:<br><br>";
    document.getElementById("questionTime").innerHTML = "길게 답변한 질문: " + parseInt(maxQuestionTime / 60) + "분 " + maxQuestionTime % 60 + "초<br>가장 짧게 답변한 질문: " + parseInt(minQuestionTime / 60) + "분 " + minQuestionTime % 60 + "초<br><br>";
    document.getElementById("best").innerHTML = "감정 빈도<br> 1위: " + emotionFunc(maxEmotionValue1) + "<br>2위: " + emotionFunc(maxEmotionValue2) + "<br>3위: " + emotionFunc(maxEmotionValue3) + "<br><br>성향 BEST3:<br>높은 수치 가장 많이 사용한 단어 BEST3: 많이 말한 순위 1,2,3 그 다음 몇번말했는지<br>";
}

function setEmotionTrendResult() {
    var tempidx = 0;
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
        var temp = happinessList.slice(tempidx, tempidx + 6);
        var value = 0;
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        temp = neutralList.slice(tempidx, tempidx + 6);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (6000 - value > 3000) {
            document.getElementById("ltext" + i).innerHTML += "이 질문에 당황한 흔적이 보여요. 이에 대한 대비가 필요하지 않을까요?<br>";
        }
        
        //행복도 체크
        temp = happinessList.slice(tempidx, tempidx + xAxis[i].length);
        for (var j = 0; j < temp.length; j++) value += 1000 * temp[j];
        if (value > temp.length * 100 * 0.6) document.getElementById("ltext" + i).innerHTML += "표정에서 행복함이 묻어나 보기 좋아요. 다만 때로는 진지한 모습을 보여주는 것도 좋아요!<br>";

        tempidx += xAxis[i].length;
    }

    //첫인상 체크
    var first = 0;
    var temp = happinessList.slice(0, 3);
    for (var j = 0; j < temp.length; j++) first += 1000 * temp[j];
    if (first < 1500) {
        document.getElementById("ltext1").innerHTML += "면접에 있어서 첫인상이 중요해요. 웃는 표정을 지으며 시작하는 것은 어떨까요?<br>";
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
        if (maxvalue == xAxis[i].length && maxvalue == emotionFreq[i - 1][5]) {
            document.getElementById("ptext" + i).innerHTML += "무표정을 유지하고 계시네요. 조금씩은 웃는 표정을 지어보는게 어떨까요?<br>";
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

