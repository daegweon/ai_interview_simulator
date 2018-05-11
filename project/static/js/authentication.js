
$('#login').click(function(e) {
    e.preventDefault();

    var param = $("#loginForm").serialize();
    $.ajax({
        url:'/member/signin',
        type: 'POST',
        data: param
    }).done(function(data) {
        if(data == "loginerror") {
            alert("아이디 혹은 비밀번호가 잘못되었습니다.");
        } else {
            window.location.replace('/interviews');
        }
    });
});

// TODO: 수정 필요
// $('#register').click(function(e){
//     e.preventDefault();
//     var form = $("#registerForm")[0];
//     var formData = new FormData(form);
//     formData.append('csrfmiddlewaretoken',csrftoken);
//     $.ajax({
//     url:'/member/signup/', //this is the submit URL
//     type: 'POST', //or POST
//     processData: false,
//     contentType:false,
//     data: formData,
//     success: function(data){
//     }
//     }).done(function(data){
//         if(data=="registerError"){
//             alert("회원가입에 실패하였습니다. 입력 정보를 확인하세요.");
//         }
//         else{
//             alert("회원가입에 성공하였습니다. 가입한 계정으로 로그인됩니다.");
//             window.location.replace('/interviews');
//         }
//     });
// });