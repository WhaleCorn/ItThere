function checkLogin() { 
    
    var username = document.loginForm.username;
    var userpw = document.loginForm.userpw;
    
    if(username.value ==''){
        window.alert('아이디를 입력하세요.');
        return false;
    }
    
    else if(userpw.value ==''){
        window.alert('비밀번호를 입력하세요.');
        return false;
    }
    
    return true;
}

window.onload=function() {

    
    
};

