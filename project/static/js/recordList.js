/*****************************************************************************************
1. 파일명: recordList.js
2. 저자 : Human Learning
3. 목적 : 데이터베이스에서 로그인한 사용자의 면접 횟수, 면접 날짜를 받아와 면접 실시 내역을 출력한다.
 4. 참조 : 없음
 5. 제한(restriction) : 사용자는 로그인 상태여야 한다.
******************************************************************************************/

$(document).ready(function(){
  var tablebody = document.getElementById("tablebody");

  for (var i = 0; i < count; i++) {
    var row = document.createElement('tr');
    var firstcol = document.createElement('td');
    var secondcol = document.createElement('td');
    var thirdcol = document.createElement('td');
    var firstatag = document.createElement('a');
    var mediadiv2 = document.createElement('div');
    var mediabodydiv2 = document.createElement('div');
    var span2 = document.createElement('span');


    var testURL = '/interviews/test/result/' + interviewCountList[i];
    row.setAttribute("data-status", "pendiente");
    row.setAttribute("onClick", "window.location.href='" + testURL + "'");
    secondcol.innerHTML = "제 " + (i + 1) + "회 실전면접"; //어떤 몇회 어떤 타입의 모의 면접인지


    firstcol.width = "20%";
    secondcol.width = "35%";
    thirdcol.width = "45%";
    firstcol.style.textAlign = "center";
    secondcol.style.textAlign = "center";
    thirdcol.style.textAlign = "center";

    /* 테이블 column에 대한 설정 */
    firstatag.innerHTML = i + 1; //몇 회 인지
    firstcol.appendChild(firstatag);
    mediadiv2.className = "media";
    mediabodydiv2.className = "media-body";
    span2.className = "media-meta";

    span2.innerHTML = dateList[i]; //면접 날짜 
    mediabodydiv2.appendChild(span2);
    mediadiv2.appendChild(mediabodydiv2);
    thirdcol.appendChild(mediadiv2);
    row.appendChild(firstcol);
    row.appendChild(secondcol);
    row.appendChild(thirdcol);
    tablebody.appendChild(row);
  }
});
