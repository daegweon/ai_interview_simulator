var personalityList = profile["personality"];
var needsList = profile["needs"];
var valuesList = profile["values"];

var descriptionDict = {
  "Agreeableness_minus_Conscientiousness_minus_": "단호한",
  "Neuroticism_plus_Extraversion_minus_": "신중한",
  "Agreeableness_minus_Neuroticism_minus_": "둔감한",
  "Agreeableness_plus_Neuroticism_plus_": "감상적인",
  "Conscientiousness_minus_Neuroticism_minus_": "형식에 얽매이지 않는",
  "Agreeableness_plus_Conscientiousness_minus_": "잘난체 하지 않는",
  "Conscientiousness_plus_Agreeableness_plus_": "사려깊은",
  "Agreeableness_minus_Extraversion_plus_": "퉁명스러운",
  "Neuroticism_plus_Openness_minus_": "쉽게 짜증내는",
  "Openness_minus_Agreeableness_plus_": "단순한",
  "Neuroticism_minus_Openness_minus_": "둔감한",
  "Agreeableness_minus_Conscientiousness_minus_": "무심한",
  "Extraversion_plus_Conscientiousness_plus_": "활동적인",
  "Agreeableness_minus_Conscientiousness_plus_": "엄격한",
  "Neuroticism_minus_Agreeableness_plus_": "낙관적인",
  "Openness_minus_Extraversion_minus_": "어두침침한",
  "Extraversion_plus_Agreeableness_minus_": "고집이 센",
  "Neuroticism_plus_Agreeableness_minus_": "참을성이 없는",
  "Neuroticism_plus_Extraversion_plus_": "쉽게 흥분하는",
  "Agreeableness_minus_Openness_minus_": "속이 좁은",
  "Conscientiousness_minus_Agreeableness_plus_": "잘난 체 하지 않는",
  "Agreeableness_plus_Openness_plus_": "상냥한",
  "Agreeableness_minus_Neuroticism_plus_": "이기적인",
  "Openness_minus_Neuroticism_minus_": "쉽게 동요하지 않는",
  "Conscientiousness_plus_Openness_plus_": "교양있는",
  "Agreeableness_minus_Openness_plus_": "개인주의적인",
  "Neuroticism_plus_Openness_plus_": "열정적인",
  "Neuroticism_minus_Openness_plus_": "창의적인",
  "Openness_minus_Conscientiousness_plus_": "보수적인",
  "Extraversion_plus_Openness_minus_": "거만한",
  "Extraversion_minus_Openness_plus_": "자기성찰적인",
  "Openness_minus_Conscientiousness_minus_": "무모한",
  "Extraversion_minus_Neuroticism_minus_": "차분한",
  "Conscientiousness_plus_Openness_minus_": "보수적인",
  "Openness_plus_Neuroticism_minus_": "창의적인",
  "Agreeableness_plus_Extraversion_minus_": "겸손한",
  "Extraversion_minus_Conscientiousness_minus_": "느릿느릿 움직이는",
  "Openness_plus_Conscientiousness_plus_": "교양있는",
  "Openness_minus_Extraversion_plus_": "거만한",
  "Conscientiousness_minus_Agreeableness_minus_": "의심많은",
  "Agreeableness_plus_Neuroticism_minus_": "관대한",
  "Openness_plus_Agreeableness_minus_": "상황판단이 빠른",
  "Conscientiousness_plus_Extraversion_plus_": "야심찬",
  "Openness_plus_Agreeableness_plus_": "이상주의적인",
  "Conscientiousness_minus_Openness_minus_": "무모한",
  "Conscientiousness_plus_Neuroticism_plus_": "극도로 긴장한",
  "Neuroticism_minus_Extraversion_plus_": "포기할 줄 모르는",
  "Openness_minus_Agreeableness_minus_": "퉁명스러운",
  "Neuroticism_plus_Agreeableness_plus_": "다정한",
  "Extraversion_minus_Agreeableness_plus_": "겸손한",
  "Agreeableness_plus_Extraversion_plus_": "유머러스한",
  "Openness_plus_Extraversion_plus_": "탐구심이 많은",
  "Extraversion_minus_Openness_minus_": "수동적인",
  "Extraversion_minus_Conscientiousness_plus_": "신중한",
  "Neuroticism_minus_Extraversion_minus_": "잘난체하지 않는",
  "Extraversion_plus_Neuroticism_plus_": "변덕스러운",
  "Extraversion_plus_Openness_plus_": "솔직한",
  "Conscientiousness_minus_Openness_plus_": "관습에 얽매이지 않는",
  "Extraversion_minus_Agreeableness_minus_": "비사교적인",
  "Conscientiousness_minus_Neuroticism_plus_": "충동적인",
  "Conscientiousness_plus_Neuroticism_minus_": "결단력있는",
  "Openness_minus_Neuroticism_plus_": "쉽게 짜증내는",
  "Conscientiousness_plus_Extraversion_minus_": "조심스러운",
  "Agreeableness_plus_Conscientiousness_plus_": "사려깊은",
  "Neuroticism_minus_Conscientiousness_plus_": "논리적인",
  "Extraversion_plus_Neuroticism_minus_": "자신감있는",
  "Agreeableness_minus_Extraversion_minus_": "냉소적인",
  "Neuroticism_minus_Conscientiousness_minus_": "형식에 얽매이지 않는",
  "Neuroticism_minus_Agreeableness_minus_": "열정없는",
  "Extraversion_minus_Neuroticism_plus_": "겁이많은",
  "Openness_plus_Extraversion_minus_": "자기성찰적인",
  "Extraversion_plus_Conscientiousness_minus_": "활기가 넘치는",
  "Conscientiousness_minus_Extraversion_plus_": "명랑쾌활한",
  "Openness_plus_Neuroticism_plus_": "열정을 느끼는",
  "Extraversion_plus_Agreeableness_plus_": "사회적인",
  "Neuroticism_plus_Conscientiousness_minus_": "강박적인",
  "Openness_plus_Conscientiousness_minus_": "관습에 얽매이지 않는",
  "Conscientiousness_minus_Extraversion_minus_": "우유부단한",
  "Neuroticism_plus_Conscientiousness_plus_": "극도로 긴장한"
}
var valuesDict = {
  "value_self_transcendence": {
    "Term": "타인을 돕는 것",
    "LowDescription": "사람들이 간섭없이 자신의 일을 할 수 있다고 생각합니다",
    "HighDescription": "당신의 주변 사람들을 돌보는 것이 중요하다고 생각합니다"
  },
  "value_hedonism": {
    "Term": "인생의 즐거움을 즐기는 것",
    "LowDescription": "단지 개인적인 즐거움보다 더 큰 목적을 가진 활동을 선호합니다",
    "HighDescription": "인생을 최대한 즐기기 위해 매우 의욕적입니다"
  },
  "value_conservation": {
    "Term": "전통",
    "LowDescription": "다른 사람들이 한 것을 따르는 것보다 직접 하는 것에 더 신경씁니다",
    "HighDescription": "당신이 소속된 그룹을 매우 존경하고 그들의 지침을 따릅니다"
  },
  "value_self_enhancement": {
    "Term": "성공 달성",
    "LowDescription": "자신의 재능을 과시하는 방법을 거의 고려하지 않고 결정합니다",
    "HighDescription": "자기자신을 나아지게 하며 당신이 유능한 사람임을 입증 할 수있는 기회를 찾으십시오"
  },
  "value_openness_to_change": {
    "Term": "독립",
    "LowDescription": "다른 사람들이 당신의 활동을 지시할 때 기꺼이 받아들입니다",
    "HighDescription": "최상의 목표달성 방법을 결정하기 위해 자신의 목표를 설정하는 것을 좋아합니다"
  }
}
var facetsDict = {
  "facet_intellect": {
    "LowTerm": "구체적인",
    "HighDescription": "새로운 아이디어에 흥미와 열린마음을 가지고 있고, 그것들을 탐구하는 것을 좋아합니다",
    "HighTerm": "철학적인",
    "LowDescription": "추상적인 생각을 거의 고려하지 않고, 있는 그대로 처리하는 것을 선호합니다",
  },
  "facet_gregariousness": {
    "LowTerm": "의존적인",
    "HighDescription": "다른 사람들과 함께하는 것을 좋아합니다",
    "HighTerm": "사교적인",
    "LowDescription": "자신만의 시간을 갖고 싶어하는 강한 열망이 있습니다",
  },
  "facet_achievement_striving": {
    "LowTerm": "만족하는",
    "HighDescription": "자신을 위한 높은 목표를 가지고 있으며 그것을 달성하기 위해 열심히 노력합니다",
    "HighTerm": "의욕이 넘치는",
    "LowDescription": "당신의 성취수준에 만족하여 야심찬 목표를 설정할 필요성을 느끼지 못합니다",
  },
  "facet_depression": {
    "LowTerm": "만족하는",
    "HighDescription": "당신이 행복해하지 않는 일에 대해 꽤 자주 생각합니다",
    "HighTerm": "우울한",
    "LowDescription": "일반적으로 자기자신을 편하게 느낍니다",
  },
  "facet_sympathy": {
    "LowTerm": "무정한",
    "HighDescription": "다른 사람들이 느끼는 것을 느끼고 그들에게 동정심을 가집니다",
    "HighTerm": "이해심이 있는",
    "LowDescription": "사람들이 일반적으로 다른 사람들보다 자신에게 더 의존해야한다고 생각합니다",
  },
  "facet_imagination": {
    "LowTerm": "현실적인",
    "HighDescription": "엉뚱한 상상력을 가지고 있습니다",
    "HighTerm": "상상력이 풍부한",
    "LowDescription": "환상보다 사실을 선호합니다",
  },
  "facet_self_discipline": {
    "LowTerm": "간헐적인",
    "HighDescription": "어려운 작업과 맞서 싸우고 수행할 수 있습니다",
    "HighTerm": "끈질긴",
    "LowDescription": "어려운 작업을 오랜 기간 수행하는데 어려움을 겪고 있습니다",
  },
  "facet_assertiveness": {
    "LowTerm": "조용한",
    "HighDescription": "상황을 대변하고 책임지는 경향이 있으며, 그룹을 이끄는게 편안합니다",
    "HighTerm": "적극적인",
    "LowDescription": "특히 그룹 상황에서 말하는 것보다 듣는 것을 더 선호합니다",
  },
  "facet_cheerfulness": {
    "LowTerm": "근엄한",
    "HighDescription": "즐거운 사람이고 그 기쁨을 세상과 공유합니다",
    "HighTerm": "쾌활한",
    "LowDescription": "일반적으로 심각하고 자주 농담하지 않습니다",
  },
  "facet_self_efficacy": {
    "LowTerm": "자신감이 부족한",
    "HighDescription": "당신이 시작한 일을 성공적으로 수행하는 능력이 있다고 느낍니다",
    "HighTerm": "자신감있는",
    "LowDescription": "당신의 목표를 달성하는 능력에 자주 의문이 생깁니다",
  },
  "facet_morality": {
    "LowTerm": "타협적인",
    "HighDescription": "출세하기 위해 다른 사람들을 이용하는 것이 잘못 되었다고 생각합니다",
    "HighTerm": "타협하지않는",
    "LowDescription": "당신이 원하는 것을 얻기 위해 모든 가능한 방법을 사용하는 것이 편안합니다",
  },
  "facet_liberalism": {
    "LowTerm": "권위를 존중하는",
    "HighDescription": "긍정적인 변화를 가져올 수 있도록 하기 위해 권위와 전통적 가치에 도전하는 것을 선호합니다",
    "HighTerm": "권위에 도전하는",
    "LowDescription": "안정감을 유지하기 위해 전통을 따르는 것을 선호합니다",
  },
  "facet_altruism": {
    "LowTerm": "자기중심적인",
    "HighDescription": "다른 사람들을 도울 때 성취감을 느낄 것이고, 그렇게 하기위해 특별히 애를 쓸 것 입니다",
    "HighTerm": "이타적인",
    "LowDescription": "다른 사람들을 위해 시간을 보내는 것보다 자신을 돌보는 것이 더 신경씁니다",
  },
  "facet_self_consciousness": {
    "LowTerm": "자신감있는",
    "HighDescription": "다른 사람들이 당신에 대해 생각하고 있는 것에 민감합니다",
    "HighTerm": "남의 시선을 의식하는",
    "LowDescription": "당신은 당황하기가 어렵고 대체로 자신감이 있습니다",
  },
  "facet_vulnerability": {
    "LowTerm": "압박감을 받아도 침착한",
    "HighDescription": "스트레스가 많은 상황에서 쉽게 압도됩니다",
    "HighTerm": "스트레스에 민감한",
    "LowDescription": "예기치 않은 사건을 침착하고 효과적으로 처리합니다",
  },
  "facet_trust": {
    "LowTerm": "타인을 조심하는",
    "HighDescription": "다른 사람들을 가장 잘 믿으며 사람들을 쉽게 신뢰합니다",
    "HighTerm": "타인을 신뢰하는",
    "LowDescription": "다른 사람들의 의도에 조심성이 있으며 쉽게 신뢰하지 않습니다",
  },
  "facet_orderliness": {
    "LowTerm": "조직화 되지않은",
    "HighDescription": "인생에서 체계적인 것들에 대한 강한 필요성을 느낍니다",
    "HighTerm": "조직적인",
    "LowDescription": "일상생활에서 조직을 위해 많은 시간을 보내지 않습니다",
  },
  "facet_anxiety": {
    "LowTerm": "자신감있는",
    "HighDescription": "일어날 수 있는 일에 대해 걱정하는 경향이 있습니다",
    "HighTerm": "걱정을 잘하는",
    "LowDescription": "평온하고 자신감이 있는 경향이 있습니다",
  },
  "facet_friendliness": {
    "LowTerm": "내성적인",
    "HighDescription": "쉽게 친구를 사귀고 다른 사람들과 함께 있는 것을 편안하게 느낍니다",
    "HighTerm": "외향적인",
    "LowDescription": "개인적인 성향의 사람이고 많은 사람들을 마음속에 들여 보내지 않습니다",
  },
  "facet_modesty": {
    "LowTerm": "자랑스러워하는",
    "HighDescription": "집중의 중심에 있는 것이 불편합니다",
    "HighTerm": "보통의",
    "LowDescription": "자부심이 대단하고, 당신의 자아에 만족합니다",
  },
  "facet_activity_level": {
    "LowTerm": "느긋한",
    "HighDescription": "많은 활동과 함께 빠르게 진행되고, 바쁜 일정을 즐깁니다",
    "HighTerm": "활동적인",
    "LowDescription": "인생의 여유로운 속도에 감사하게 생각합니다",
  },
  "facet_cautiousness": {
    "LowTerm": "대담한",
    "HighDescription": "의사결정을 내리기 전에 면밀히 생각합니다",
    "HighTerm": "계획적인",
    "LowDescription": "결정을 내리는 데 심사숙고하는 시간을 소비하는 것보다 차라리 바로 행동을 취하는 편입니다",
  },
  "facet_dutifulness": {
    "LowTerm": "근심걱정없는",
    "HighDescription": "심지어 불편할 때라도, 심하게 규칙과 의무를 지킵니다",
    "HighTerm": "순종적인",
    "LowDescription": "규칙과 의무를 무시하고 당신이 원하는 것을 합니다",
  },
  "facet_artistic_interests": {
    "LowTerm": "예술에 무관심한",
    "HighDescription": "아름다움을 즐기고 창조적인 경험을 찾아냅니다",
    "HighTerm": "예술에 감탄하는",
    "LowDescription": "설문 조사에 참여한 대부분의 사람들보다 예술적이거나 창조적인 활동에 덜 관심이 있습니다",
  },
  "facet_immoderation": {
    "LowTerm": "Self-세심히 통제된",
    "HighDescription": "당신의 열망을 강력하게 느끼고 그것들에 의해 쉽게 유혹됩니다",
    "HighTerm": "쾌락주의의",
    "LowDescription": "특히 강렬하지 않은 당신의 열망을 통제 할 수 있습니다",
  },
  "facet_emotionality": {
    "LowTerm": "감정에 좌우되지 않는",
    "HighDescription": "당신의 감정과 그것을 표현하는 법을 알고 있습니다",
    "HighTerm": "감정적으로 의식하는",
    "LowDescription": "자주 당신의 감정을 생각하거나 공개적으로 표현하지 않습니다",
  },
  "facet_adventurousness": {
    "LowTerm": "일관된",
    "HighDescription": "새로운 것을 경험하고 싶어합니다",
    "HighTerm": "모험심이 강한",
    "LowDescription": "익숙한 루틴을 즐기고, 그것으로 부터 이탈하지 않는 것을 선호합니다",
  },
  "facet_anger": {
    "LowTerm": "온순한 기질인",
    "HighDescription": "과격한 기질이 있는데, 특히 당신의 뜻대로 되지 않을 때 그렇습니다",
    "HighTerm": "불같은",
    "LowDescription": "화가 나는데 많은 시간이 필요합니다",
  },
  "facet_excitement_seeking": {
    "LowTerm": "침착함을 추구하는",
    "HighDescription": "많은 액션이 없을 때 지루함을 느끼고 위험을 감수하는 것에 흥분합니다",
    "HighTerm": "흥분을 추구하는",
    "LowDescription": "조용하고 안정적이며 안전한 활동을 선호합니다",
  },
  "facet_cooperation": {
    "LowTerm": "버릇없는",
    "HighDescription": "기뻐하는 감정이 쉽게 나타나며 대립을 피하려기 위해 노력합니다",
    "HighTerm": "잘 협조하는",
    "LowDescription": "자기모순적인 다른 사람들로부터 피하지 않습니다",
  }
}

var needsDict = {
  "need_practicality": ["효율성", "실현가능성", "높은가치", "편의성"],
  "need_curiosity": ["발견", "숙달", "지식습득"],
  "need_stability": ["안정성", "진위", "신뢰성"],
  "need_self_expression": ["자기표현", "개인적인 권한", "개인적인 강점"],
  "need_structure": ["조직", "정직함", "명확성", "신뢰할 수 있음"],
  "need_challenge": ["명성", "경쟁", "영광"],
  "need_liberty": ["현대성", "가능성 확장", "탈출", "자발적임", "참신함"],
  "need_harmony": ["행복", "정중함", "공손함"],
  "need_love": ["소속관계", "친밀감"],
  "need_excitement": ["흥청대며놀기", "예측", "유쾌한 기분"],
  "need_ideal": ["교양", "정신성", "우월함", "이행"],
  "need_closeness": ["소속성", "향수", "친밀함"]
}

var personalityFlagList = {
  "Openness": 0,
  "Conscientiousness": 0,
  "Extraversion": 0,
  "Agreeableness": 0,
  "Neuroticism": 0
}
var personalityPercentages = {
  "Openness": personalityList[0]["percentile"],
  "Conscientiousness": personalityList[1]["percentile"],
  "Extraversion": personalityList[2]["percentile"],
  "Agreeableness": personalityList[3]["percentile"],
  "Neuroticism": personalityList[4]["percentile"]
}

var facetPercentages = {
  "facet_adventurousness": personalityList[0]["children"][0]["percentile"],
  "facet_artistic_interests": personalityList[0]["children"][1]["percentile"],
  "facet_emotionality": personalityList[0]["children"][2]["percentile"],
  "facet_imagination": personalityList[0]["children"][3]["percentile"],
  "facet_intellect": personalityList[0]["children"][4]["percentile"],
  "facet_liberalism": personalityList[0]["children"][5]["percentile"],
  "facet_achievement_striving": personalityList[1]["children"][0]["percentile"],
  "facet_cautiouness": personalityList[1]["children"][1]["percentile"],
  "facet_dutifulness": personalityList[1]["children"][2]["percentile"],
  "facet_orderliness": personalityList[1]["children"][3]["percentile"],
  "facet_self_discipline": personalityList[1]["children"][4]["percentile"],
  "facet_self_efficacy": personalityList[1]["children"][5]["percentile"],
  "facet_activity_level": personalityList[2]["children"][0]["percentile"],
  "facet_assertiveness": personalityList[2]["children"][1]["percentile"],
  "facet_cheerfulness": personalityList[2]["children"][2]["percentile"],
  "facet_excitement_seeking": personalityList[2]["children"][3]["percentile"],
  "facet_friendliness": personalityList[2]["children"][4]["percentile"],
  "facet_gregariousness": personalityList[2]["children"][5]["percentile"],
  "facet_altruism": personalityList[3]["children"][0]["percentile"],
  "facet_cooperation": personalityList[3]["children"][1]["percentile"],
  "facet_modesty": personalityList[3]["children"][2]["percentile"],
  "facet_morality": personalityList[3]["children"][3]["percentile"],
  "facet_sympathy": personalityList[3]["children"][4]["percentile"],
  "facet_trust": personalityList[3]["children"][5]["percentile"],
  "facet_anger": personalityList[4]["children"][0]["percentile"],
  "facet_anxiety": personalityList[4]["children"][1]["percentile"],
  "facet_depression": personalityList[4]["children"][2]["percentile"],
  "facet_immoderation": personalityList[4]["children"][3]["percentile"],
  "facet_self_consciousness": personalityList[4]["children"][4]["percentile"],
  "facet_vulnerability": personalityList[4]["children"][5]["percentile"]
}

var needsPercentage = {
  "need_challenge": needsList[0]["percentile"],
  "need_closeness": needsList[1]["percentile"],
  "need_curiosity": needsList[2]["percentile"],
  "need_excitement": needsList[3]["percentile"],
  "need_harmony": needsList[4]["percentile"],
  "need_ideal": needsList[5]["percentile"],
  "need_liberty": needsList[6]["percentile"],
  "need_love": needsList[7]["percentile"],
  "need_practicality": needsList[8]["percentile"],
  "need_self_expression": needsList[9]["percentile"],
  "need_stability": needsList[10]["percentile"],
  "need_structure": needsList[11]["percentile"]
}

var valuePercentage = {
  "value_conservation": valuesList[0]["percentile"],
  "value_openness_to_change": valuesList[1]["percentile"],
  "value_hedonism": valuesList[2]["percentile"],
  "value_self_enhancement": valuesList[3]["percentile"],
  "value_self_transcendence": valuesList[4]["percentile"]
}

var sortedPersonality = sortProperties(personalityPercentages);
var sortedFacet = sortProperties(facetPercentages);
var sortedNeed = sortProperties(needsPercentage);
var sortedValue = sortProperties(valuePercentage);
var validPersonality = 0;
for (var key in personalityFlagList) {
  if (0.5 - personalityPercentages[key] < -0.18) {
    //document.getElementById("personality-result").innerHTML += (personalityList[i]["percentile"] + "<br>");
    personalityFlagList[key] = 1;
    validPersonality += 1;
  }
  else if (0.5 - personalityPercentages[key] > 0.18) {
    //document.getElementById("personality-result").innerHTML += (personalityList[i]["percentile"] + "<br>");
    personalityFlagList[key] = -1;
    validPersonality += 1;
  }
}
for (var j = 0; validPersonality > 1 && j < 3; validPersonality-- , j++) {
  if (j != 0) {
    document.getElementById('personality-result').innerHTML += ", ";
  }
  var personalityString = "";
  var personalityCount = 0;
  for (var i = sortedPersonality.length - 1; (i >= 0) && personalityCount < 2; i--) {
    if (personalityFlagList[sortedPersonality[i][0]] == 1) {
      personalityString += (sortedPersonality[i][0] + "_plus_")
      personalityCount += 1;
    }
    else if (personalityFlagList[sortedPersonality[i][0]] == -1) {
      personalityString += (sortedPersonality[i][0] + "_minus_")
      personalityCount += 1;
    }
  }
  document.getElementById('personality-result').innerHTML += descriptionDict[personalityString];
  sortedPersonality.pop();
}
document.getElementById('personality-result').innerHTML += " 성격입니다.</h4>";

for (var i = sortedFacet.length - 1, count = 0; count < 3 && i >= 0; i--) {
  if (0.5 - sortedFacet[i][1] < -0.18) {
    count += 1;
    document.getElementById('facet-result').innerHTML += facetsDict[sortedFacet[i][0]]["HighTerm"] + " 성격입니다. ";
    document.getElementById('facet-result').innerHTML += facetsDict[sortedFacet[i][0]]["HighDescription"] + ".<br>";
  }
  else if (0.5 - sortedFacet[i][1] > 0.18) {
    count += 1;
    document.getElementById('facet-result').innerHTML += facetsDict[sortedFacet[i][0]]["LowTerm"] + " 성격입니다. ";
    document.getElementById('facet-result').innerHTML += facetsDict[sortedFacet[i][0]]["LowDescription"] + ".<br>";
  }
}

document.getElementById('needs-result').innerHTML += username + "님의 선택들은 <strong>" + needsDict[sortedNeed[sortedNeed.length-1][0]] + "</strong>에 대한 열망에 의해 좌우됩니다.";

var plusCount = 0;
var minusCount = 0;
var valuePlusString = "";
var valueMinusString = "";
var valueTempPlus = "";
var valueTempMinus = "";
var valueDescriptionPlus = "";
var valueDescriptionMinus = "";

for (var i = sortedValue.length - 1; i >= 0; i--) {
  if (0.5 - sortedValue[i][1] < -0.18) {
    plusCount += 1;
    if (plusCount == 1) {
      valuePlusString = username + "님은 " + valuesDict[sortedValue[i][0]]["Term"] + "을 가치있게 여깁니다. ";
      valueTempPlus = valuesDict[sortedValue[i][0]]["Term"];
      valueDescriptionPlus += valuesDict[sortedValue[i][0]]["HighDescription"] + ". ";
    }
    else if (plusCount == 2) {
      valuePlusString = username + "님은 " + valueTempPlus + "과 " + valuesDict[sortedValue[i][0]]["Term"] + " 모두를 가치있게 여깁니다. ";
      valueDescriptionPlus += valuesDict[sortedValue[i][0]]["HighDescription"] + ". ";
    }
  }
  else if (0.5 - sortedValue[i][1] > 0.18) {
    minusCount += 1;
    if (minusCount == 1) {
      valueMinusString = username + "님은 " + valuesDict[sortedValue[i][0]]["Term"] + "에 대해 신경쓰지 않습니다. ";
      valueTempMinus = valuesDict[sortedValue[i][0]]["Term"];
      valueDescriptionMinus += valuesDict[sortedValue[i][0]]["LowDescription"] + ". ";
    }
    else if (minusCount == 2) {
      valueMinusString = username + "님은 " + valueTempMinus + "과 " + valuesDict[sortedValue[i][0]]["Term"] + "를 신경쓰지 않는 편입니다. ";
      valueDescriptionMinus += valuesDict[sortedValue[i][0]]["LowDescription"] + ". ";
    }
  }
}
document.getElementById('value-result').innerHTML += valuePlusString + valueDescriptionPlus + "<br>" + valueMinusString + valueDescriptionMinus;


function sortProperties(obj) {
  // convert object into array
  var sortable = [];
  for (var key in obj)
    if (obj.hasOwnProperty(key))
      sortable.push([key, obj[key]]); // each item is an array in format [key, value]

  // sort items by value
  sortable.sort(function (a, b) {
    return a[1] - b[1]; // compare numbers
  });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}
