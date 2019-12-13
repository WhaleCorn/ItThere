
  
function checkJoin() {
        
    var radioR1 = $('input[name=r1]:checked').val();
    var radioR2 = $('input[name=r3]:checked').val();
    var userId = document.frm.userId;
    var userPw = document.frm.userPw;
    var pwCheck = document.frm.pwCheck;
    var userName = document.frm.userName;
    
    if(radioR1=="2"){
        window.alert('약관에 동의해주세요.');
        $('html, body').animate({scrollTop : $('.radio_name').offset().top},100);
        return false;
    }
    else if(userId.value ==''){
        window.alert('아이디를 입력하세요.');
        $('html, body').animate({scrollTop : $(userId).offset().top-20},100);
        return false;
    }
    else if(radioR2!="1" && radioR2!="2"){
        window.alert('권한을 선택해주세요.');
        $('html, body').animate({scrollTop : $(userId).offset().top-20},100);
        return false;
    }
    else if(userPw.value==''){
        window.alert('비밀번호를 입력하세요.');
        $('html, body').animate({scrollTop : $(userPw).offset().top-20},100);
        return false;
    }
    else if(pwCheck.value==''){
        window.alert('비밀번호 확인이 필요합니다.');
        $('html, body').animate({scrollTop : $(pwCheck).offset().top-20},100);
        return false;
    }
    else if(userPw.value != pwCheck.value){
        window.alert('비밀번호 확인이 일치하지 않습니다.');
        $('html, body').animate({scrollTop : $(pwCheck).offset().top-20},100);
        return false;
    }
    else if(userName.value == ''){
        window.alert('이름을 입력하세요.');
        return false;
    }
    
    return true;
}
