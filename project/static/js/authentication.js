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
            window.location.replace('/interviews');
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
            alert("회원가입에 성공하였습니다. 가입한 계정으로 로그인됩니다.");
            window.location.replace('/interviews');
        }
    });
});