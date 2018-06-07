/*****************************************************************************************
 1. 파일명: personality.js
 2. 저자 : Human Learning
 3. 목적 : 홈페이지에서 성향 분석 결과 수치를 테이블로 정리하여 보여줌.
 4. 참조 : IBM Watson Personality Insights Documents 모델 설명(https://console.bluemix.net/docs/services/personality-insights/models.html#models)
 5. 제한(restriction) : DB에 성향 분석 결과가 JSON형태로 profile 변수에 저장되어 있어야 함.
                        infoImgPath가 이미 선언되어 있어야 함.
******************************************************************************************/

function big5Dropdown() {

    var big5Explain = {
        "개방성": "개인이 다양한 활동을 경험하려는 열린 마음을 지닌 정도",
        "친화성": "타인에 대한 연민과 협력에 대한 성향",
        "성실성": "체계적이고 사려 깊은 방식으로 행동하는 성향",
        "외향성": "타인과 만났을 때에 자극을 받는 성향",
        "감정의 기복": "개인의 감정이 환경에 민감한 정도",
        "모험성": "높음 : 모험적 / 낮음 : 일관됨",
        "예술적 흥미": "높음 : 예술을 즐김 / 낮음 : 예술에 무관심",
        "정서성": "높음 : 감성적 인식 / 낮음 : 감정에 좌우되지 않음",
        "상상력": "높음 : 공상적 / 낮음 : 현실적",
        "지력": "높음 : 철학적 / 낮음 : 구체적",
        "권력에 저항": "높음 : 권위 도전 / 낮음 : 권위 존중",
        "성취 추구": "높음 : 주도적 / 낮음 : 자족함",
        "신중함": "높음 : 의도적 / 낮음 : 대담함",
        "순종성": "높음 : 충실함 / 낮음 : 걱정 없음",
        "질서 정연함": "높음 : 체계적 / 낮음 : 비체계적",
        "자기 훈련": "높음 : 지속적 / 낮음 : 간헐적",
        "자기 효능감": "높음 : 자신감 있는 / 낮음 : 자신감 없는",
        "활동 레벨": "높음 : 활동적 / 낮음 : 느긋함",
        "자신만만함": "높음 : 적극적인 / 낮음 : 조용함",
        "쾌활": "높음 : 쾌활함 / 낮음 : 엄숙함",
        "자극 탐색": "높음 : 자극 추구 / 낮음 : 조용함 추구",
        "외향적": "높음 : 외향적 / 낮음 : 내성적",
        "사교적": "높음 : 사교적 / 낮음 : 자립적",
        "이타성": "높음 : 이타적 / 낮음 : 자기중심적",
        "협동성": "높음 : 수용적 / 낮음 : 호전적",
        "겸손함": "높음 : 겸손함 / 낮음 : 오만함",
        "비타협성": "높음 : 도덕적 / 낮음 : 타협적",
        "동정": "높음 : 공감적 / 낮음 : 냉담함",
        "신뢰": "높음 : 타인 신뢰 / 낮음 : 타인 경계",
        "급한": "높음 : 불같은 / 낮음 : 온순한",
        "걱정이 많은": "높음 : 걱정이 많은 / 낮음 : 자신감 있는",
        "우울한": "높음 : 우울함 / 낮음 : 자족함",
        "극단적인": "높음 : 쾌락주의적 / 낮음 : 자제력이 있는",
        "자의식이 강한": "높음 : 남의 시선을 의식하는 / 낮음 : 자신감 있는",
        "스트레스에 민감한": "높음 : 상처받기 쉬움 / 낮음 : 압박감에도 차분함"
    }

    document.getElementById("personalityTable").innerHTML = "<thread><tr><th scope='col'>#</th><th scope='col' colspan=2>성향 이름</th><th scope='col'>백분위</th>";
    for (var i = 0; i < profile["personality"].length; i++) {
        //document.getElementById("personalityTable").innerHTML+='<tr><th scope="row">' + (i+1) + '</th><td>' + profile["personality"][i]["name"] + "</td><td>" + (profile["personality"][i]["percentile"]*100).toFixed(2) + "/100</td></tr>";
        var big5lines = document.createElement("tr");

        big5lines.setAttribute("class", "accordion-toggle");
        big5lines.setAttribute("data-toggle", "collapse");
        eval('big5lines.setAttribute("data-target",".collapsedLines' + i + '")');
        eval('big5lines.setAttribute("aria-controls",".collapsedLines' + i + '")');
        var big5number = document.createElement("th");
        var big5name = document.createElement("td");
        big5name.colSpan = 2;
        var big5percentage = document.createElement("td");
        big5number.appendChild(document.createTextNode(i + 1));
        big5name.appendChild(document.createTextNode(profile["personality"][i]["name"]));
        big5name.innerHTML += '&nbsp&nbsp<img data-toggle="tooltip" data-placement="top" title="' + big5Explain[profile["personality"][i]["name"]] + '" src="' + infoImgPath + '" style="width : 12px; height : 12px" >';
        big5percentage.appendChild(document.createTextNode((profile["personality"][i]["percentile"] * 100).toFixed(2) + " / 100"));
        big5percentage.innerHTML += '<span class="caret" style="float:right"></span>';
        big5lines.appendChild(big5number);
        big5lines.appendChild(big5name);
        big5lines.appendChild(big5percentage);
        document.getElementById("personalityTable").appendChild(big5lines);
        for (var j = 0; j < profile["personality"][i]["children"].length; j++) {
            eval('var lines' + j + ' = document.createElement("tr")');
            eval('big5lines.appendChild(lines' + j + ')');
            var facetblank = document.createElement("td");
            var facetnumber = document.createElement("td");
            var facetname = document.createElement("td");
            var facetpercentage = document.createElement("td");
            facetname.appendChild(document.createTextNode(profile["personality"][i]["children"][j]["name"]));
            facetname.innerHTML += '&nbsp&nbsp<img data-toggle="tooltip" data-placement="top" title="' + big5Explain[profile["personality"][i]["children"][j]["name"]] + '"  src="' + infoImgPath + '" style="width : 12px; height : 12px" >';
            facetpercentage.appendChild(document.createTextNode((profile["personality"][i]["children"][j]["percentile"] * 100).toFixed(2) + " / 100"));
            facetnumber.appendChild(document.createTextNode((i + 1) + "-" + (j + 1)));
            eval('lines' + j + '.setAttribute("id","lines' + j + '")');
            eval('lines' + j + '.setAttribute("class","collapse collapsedLines' + i + '")');
            eval('lines' + j + '.appendChild(facetblank)');
            eval('lines' + j + '.appendChild(facetnumber)');
            eval('lines' + j + '.appendChild(facetname)');
            eval('lines' + j + '.appendChild(facetpercentage)');
            eval('document.getElementById("personalityTable").appendChild(lines' + j + ')');
        }
        big5lines.setAttribute("aria-expanded", "false");

    }
    document.getElementById("personalityTable").innerHTML += "</thread>";
    $('[data-toggle="tooltip"]').tooltip();
}

function NeedsDropdown() {
    var needsExplain = {
        "도전": "성취하고 성공하며 모험을 감행하려는 욕구가 있습니다.",
        "친밀감": "가족과 연락하며 가정을 꾸미고 싶어합니다.",
        "호기심": "발견하고 찾아보며 확대시키고자 하는 욕구가 있습니다.",
        "흥미": "현실에서 벗어나 삶을 즐기고 긍정적 감정을 지니며 즐기기를 원합니다.",
        "조화": "타인과 이들의 관점, 그리고 이들의 감정을 이해합니다.",
        "이상": "완벽함과 커뮤니티 의식을 원합니다.",
        "자유": "벗어나고자 하는 욕구는 물론 패션과 새로운 것들에 대한 욕망이 있습니다.",
        "사랑": "한 사람을 만나든지 혹은 여러 사람을 만나든지 여부와 무관하게 사회적 접촉을 즐깁니다. 사람들의 화합과 관련된 모든 브랜드는 이 욕구를 이용합니다.",
        "실용성": "업무를 마치고자 하는 욕구, 기술과 효율성에 대한 욕구를 보유하며, 이에는 신체적 표현과 경험이 포함될 수 있습니다.",
        "자기 표현": "자신의 정체성을 발견하고 확인하기를 좋아합니다.",
        "안정": "실세계에서 동등함을 추구합니다. 실용적이고 확실히 믿을 수 있는 것들을 좋아합니다.",
        "구조": "근거성 및 모두를 함께 결합하고자 하는 욕구를 표시합니다. 잘 정리되고 통제된 것들을 원합니다."
    }

    document.getElementById("personalityTable").innerHTML = "<thread><tr><th scope='col'>#</th><th scope='col'>욕구 이름</th><th scope='col'>비율</th>";
    for (var i = 0; i < profile["needs"].length; i++) {
        document.getElementById("personalityTable").innerHTML += '<tr><th scope-"row">' + (i + 1) + '</th><td>' + profile["needs"][i]["name"] + '&nbsp&nbsp<img data-toggle="tooltip" data-placement="top" title="' + needsExplain[profile["needs"][i]["name"]] + '"  src="' + infoImgPath + '" style="width : 12px; height : 12px" >' + "</td><td>" + (profile["needs"][i]["percentile"] * 100).toFixed(2) + " / 100</td></tr>";
    }
    document.getElementById("personalityTable").innerHTML += "</thread>";
    $('[data-toggle="tooltip"]').tooltip();
}
function ValuesDropdown() {
    var valuesExplain = {
        "보수성": "자제력, 질서, 그리고 변화에 대한 거부감을 강조합니다.",
        "변화에 대한 개방성": "새로운 경험을 받아들일 준비는 물론 독자적인 행동, 생각과 감정을 강조합니다.",
        "쾌락주의": "스스로 쾌락과 감각적 희열을 추구합니다.",
        "자기고양": "스스로 개인의 성공을 추구합니다.",
        "자기초월": "타인의 행복과 이익에 대한 관심을 표시합니다."
    }

    document.getElementById("personalityTable").innerHTML = "<thread><tr><th scope='col'>#</th><th scope='col'>가치 이름</th><th scope='col'>비율</th>";
    for (var i = 0; i < profile["values"].length; i++) {
        document.getElementById("personalityTable").innerHTML += '<tr><th scope-"row">' + (i + 1) + '</th><td>' + profile["values"][i]["name"] + '&nbsp&nbsp<img data-toggle="tooltip" data-placement="top" title="' + valuesExplain[profile["values"][i]["name"]] + '"  src="' + infoImgPath + '" style="width : 12px; height : 12px" >' + "</td><td>" + (profile["values"][i]["percentile"] * 100).toFixed(2) + " / 100</td></tr>";
    }
    document.getElementById("personalityTable").innerHTML += "</thread>";
    $('[data-toggle="tooltip"]').tooltip();
}