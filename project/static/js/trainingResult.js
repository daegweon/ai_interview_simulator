/*****************************************************************************************
1. 파일명: trainingResult.js
2. 저자 : Human Learning
3. 목적 : 검출된 금지 감정과 금지 단어가 무엇인지, 그리고 몇 회 검출되었는지 연습 면접 결과 페이지에 출력한다.
4. 참조 : 없음
5. 제한(restriction) : 없음
******************************************************************************************/

banwordlist = banwordlist[0].split(',');
banwordcount = banwordcount[0].split(',');
for (var i = 0; i < Object.keys(banwordlist).length; i++) {
    var spantag = document.createElement('span');
    spantag.innerHTML = banwordlist[i] + ": " + banwordcount[i] + "회<br>";
    document.getElementById('resultWordArea').appendChild(spantag);
}
banemotionlist = banemotionlist[0].split(',');
banemotioncount = banemotioncount[0].split(',');

for (var i = 0; i < Object.keys(banemotionlist).length; i++) {
    var spantag = document.createElement('span');
    spantag.innerHTML = banemotionlist[i];
    if (banemotionlist[i] == "화남") { spantag.innerHTML += ": " + banemotioncount[0] + "회<br>" }
    else if (banemotionlist[i] == "경멸") { spantag.innerHTML += ": " + banemotioncount[1] + "회<br>" }
    else if (banemotionlist[i] == "싫음") { spantag.innerHTML += ": " + banemotioncount[2] + "회<br>" }
    else if (banemotionlist[i] == "공포") { spantag.innerHTML += ": " + banemotioncount[3] + "회<br>" }
    else if (banemotionlist[i] == "행복") { spantag.innerHTML += ": " + banemotioncount[4] + "회<br>" }
    else if (banemotionlist[i] == "중립") { spantag.innerHTML += ": " + banemotioncount[5] + "회<br>" }
    else if (banemotionlist[i] == "슬픔") { spantag.innerHTML += ": " + banemotioncount[6] + "회<br>" }
    else if (banemotionlist[i] == "놀람") { spantag.innerHTML += ": " + banemotioncount[7] + "회<br>" }
    document.getElementById('resultEmotionArea').appendChild(spantag);
}