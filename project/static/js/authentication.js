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
    var csrftoken = getCookie('csrftoken');

    $('#login').click(function(e){
        e.preventDefault();
        var form = $("#loginForm")[0];
        var formData = new FormData(form);
        formData.append('csrfmiddlewaretoken',csrftoken);
        $.ajax({
        url:'/member/signin/', //this is the submit URL
        type: 'POST', //or POST
        processData: false,
        contentType:false,
        data: formData,
        success: function(data){
        }
        }).done(function(data){
            if(data=="loginerror"){
                alert("아이디 혹은 비밀번호가 잘못되었습니다.");
            }
            else{
                window.location.replace('/interviews');
            }
        });
    });

    $('#register').click(function(e){
        e.preventDefault();
        var form = $("#registerForm")[0];
        var formData = new FormData(form);
        formData.append('csrfmiddlewaretoken',csrftoken);
        $.ajax({
        url:'/member/signup/', //this is the submit URL
        type: 'POST', //or POST
        processData: false,
        contentType:false,
        data: formData,
        success: function(data){
        }
        }).done(function(data){
            if(data=="registerError"){
                alert("회원가입에 실패하였습니다. 입력 정보를 확인하세요.");
            }
            else{
                alert("회원가입에 성공하였습니다. 가입한 계정으로 로그인됩니다.");
                window.location.replace('/interviews');
            }
        });
    });