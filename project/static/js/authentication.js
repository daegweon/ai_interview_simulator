/*****************************************************************************************
1. 파일명: authentication.js
2. 저자 : Human Learning
3. 목적 : 로그인 기능, 회원가입 기능 구현을 위해 입력된 폼 데이터를 서버로 POST 전송한다. 
4. 참조 : 없음
5. 제한(restriction) : 없음
******************************************************************************************/

$('#login').click(function (e) {
    e.preventDefault();
    var param = $("#loginForm").serialize();

    $.ajax({
        url: '/member/signin', //this is the submit URL
        type: 'POST', //or POST
        data: param,
        success: function (data) {
        }
    }).done(function (data) {
        if (data == "loginerror") {
            alert("아이디 혹은 비밀번호가 잘못되었습니다.");
        }
        else {
            window.location.replace('/');
        }
    });
});

$('#register').click(function (e) {
    e.preventDefault();
    var param = $("#registerForm").serialize();
    
    $.ajax({
        url: '/member/signup', //this is the submit URL
        type: 'POST', //or POST
        data: param,
        success: function (data) {
        }
    }).done(function (data) {
        if (data == "registerError") {
            alert("회원가입에 실패하였습니다. 입력 정보를 확인하세요.");
        }
        else {
            alert("회원가입에 성공하였습니다.");
            window.location.replace('/');
        }
    });
});