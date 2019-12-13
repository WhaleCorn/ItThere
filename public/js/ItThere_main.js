window.onload=function() {
    
    setTimeout(function() {
        var mouse = document.getElementsByClassName('middle');
        mouse.item(0).style.visibility="visible";
    },2500);
    
    block = document.getElementsByClassName('block');
    user = document.getElementsByClassName('user');
    manager = document.getElementsByClassName('manager');
    img = document.getElementsByClassName('img');
    main_search = document.getElementById('main_search');
    
    img.item(0).classList.add('slide-top');
    main_search.classList.add('slide-top');
    

    var section = new Array();
    section[0] = $(".section0").offset();
    section[1] = $(".section1").offset();
    section[2] = $(".section2").offset();
    section[3] = $(".section3").offset();
    
    $('.scroll1').on('mousewheel',function(e){
        var wheel = e.originalEvent.wheelDelta;
        if(wheel>0){}
        else{
            $('html, body').animate({scrollTop : section[1].top},400);
        }
    });
    
    $('.section1').on('mousewheel',function(e){
        var wheel = e.originalEvent.wheelDelta;
        if(wheel>0){
            $('html, body').animate({scrollTop : section[0].top},400);
        }
        else{
            $('html, body').animate({scrollTop : section[2].top},400);
        }
    });
    
    $('.section2').on('mousewheel',function(e){
        var wheel = e.originalEvent.wheelDelta;
        if(wheel>0){
            $('html, body').animate({scrollTop : section[1].top},400);
        }
        else{
            $('html, body').animate({scrollTop : section[3].top},400);
        }
    });
    
    $('.section3').on('mousewheel',function(e){
        var wheel = e.originalEvent.wheelDelta;
        if(wheel>0){
            $('html, body').animate({scrollTop : section[2].top},400);
        }
        else{}
    });
    
    $('.user').hover(function user() {
        $(this).animate({width:"70%", opacity:1},1500);
        $('.manager').animate({width:"28.68%", opacity:0.6},1500);
        $('.user_pop').animate({opacity:1},1500);
        $('.manager_pop').animate({opacity:0},1500);
    });
    
    $('.manager').hover(function() {
        $(this).animate({width:"70%", opacity:1},1500);
        $('.user').animate({width:"28.68%", opacity:0.6},1500);
        $('.manager_pop').animate({opacity:1},1500);
        $('.user_pop').animate({opacity:0},1500);
    });
        //스크롤 이벤트에 쓸 변수
        scroll_section1 = $('.section1').offset().top;
        scroll_section2 = $('.section2').offset().top;
        scroll_section3 = $('.section3').offset().top;
   
   var come1 = document.getElementsByClassName('come1').item(0);
   var come2 = document.getElementsByClassName('come2').item(0);
   var come3 = document.getElementsByClassName('come3').item(0);
   var come4 = document.getElementsByClassName('come4').item(0);
   var come5 = document.getElementsByClassName('come5').item(0);
   var come6 = document.getElementsByClassName('come6').item(0);
   
   var below_line = document.getElementById('below_line');
   var contact_to = document.getElementById('contact_to');
   var contact_to_below = document.getElementById('contact_to_below');
   var right_manager = document.getElementById('right_user');
   var right_customer = document.getElementById('right_manager');
   var right_info = document.getElementById('right_info');
        
        //스크롤 이벤트
        $(window).scroll(function() {
            //추가
            if($(window).scrollTop()==0) { //section0
            img.item(0).classList.remove('slide-top');
                img.item(0).offsetWidth=img.item(0).offsetWidth;
                img.item(0).classList.add('slide-top');
                
                main_search.classList.remove('slide-top');
                main_search.offsetWidth=main_search.offsetWidth;
                main_search.classList.add('slide-top');
            
                $('.scroll0').css('width', '15px');
                $('.scroll1').css('width', '10px');
                $('.scroll2').css('width', '10px');
                $('.scroll3').css('width', '10px');
            }
            else if($(window).scrollTop()<=scroll_section1) { //section1
            
            block.item(0).classList.remove('expand');
                block.item(0).offsetWidth=block.item(0).offsetWidth;
                block.item(0).classList.add('expand');
                
            user.item(0).classList.remove('slide-top');
            user.item(0).offsetWidth=user.item(0).offsetWidth;
                user.item(0).classList.add('slide-top');
                manager.item(0).classList.remove('slide-top');
            manager.item(0).offsetWidth=manager.item(0).offsetWidth;
                manager.item(0).classList.add('slide-top');
                
                //추가
                $('.scroll0').css('width', '10px');
                $('.scroll1').css('width', '15px');
                $('.scroll2').css('width', '10px');
                $('.scroll3').css('width', '10px');
            }
            
            else if($(window).scrollTop()<=scroll_section2){ //section2
            $(come1).fadeOut(0);
            $(come2).fadeOut(0);
            $(come3).fadeOut(0);
            $(come4).fadeOut(0);
            $(come5).fadeOut(0);
            $(come6).fadeOut(0);
            $(contact_to).fadeOut(0);
            $(contact_to_below).fadeOut(0);
            $(right_manager).fadeOut(0);
            $(right_customer).fadeOut(0);
            $(right_info).fadeOut(0);
            
                //추가
                $('.scroll0').css('width', '10px');
                $('.scroll1').css('width', '10px');
                $('.scroll2').css('width', '15px');
                $('.scroll3').css('width', '10px');
            
            $(come1).fadeIn(0);
            $(below_line).animate({left:'-=1500px'},0);
            come1.classList.remove('swingsua');
            come1.offsetWidth=come1.offsetWidth;
            come1.classList.add('swingsua');
            
            setTimeout(function() {
               $(come2).fadeIn(0);
               come2.classList.remove('swingsua');
               come2.offsetWidth=come2.offsetWidth;
               come2.classList.add('swingsua');
            }, 100);
            
            setTimeout(function() {
               $(come3).fadeIn(0);
               come3.classList.remove('swingsua');
               come3.offsetWidth=come3.offsetWidth;
               come3.classList.add('swingsua');
            }, 200);
            
            setTimeout(function() {
               $(come4).fadeIn(0);
               come4.classList.remove('swingsua');
               come4.offsetWidth=come4.offsetWidth;
               come4.classList.add('swingsua');
            }, 300);
            
            setTimeout(function() {
               $(come5).fadeIn(0);
               come5.classList.remove('swingsua');
               come5.offsetWidth=come5.offsetWidth;
               come5.classList.add('swingsua');
            }, 400);
            
            setTimeout(function() {
               $(come6).fadeIn(0);
               come6.classList.remove('swingsua');
               come6.offsetWidth=come6.offsetWidth;
               come6.classList.add('swingsua');
            }, 500);
            
            setTimeout(function() {
               $(below_line).animate({left:'+=1500px'},500);
            }, 700);
            
            setTimeout(function() {
               $(contact_to).fadeIn(2000);
               $(contact_to_below).fadeIn(2000);
               
               contact_to.classList.remove('slide-left');
               contact_to.offsetWidth=contact_to.offsetWidth;
               contact_to.classList.add('slide-left');
               
               contact_to_below.classList.remove('slide-left');
               contact_to_below.offsetWidth=contact_to_below.offsetWidth;
               contact_to_below.classList.add('slide-left');
            }, 800);
            
            setTimeout(function() {
               $(right_customer).fadeIn(0);
               $(right_manager).fadeIn(0);
               $(right_info).fadeIn(0);
               
               right_customer.classList.remove('swing-top');
               right_customer.offsetWidth=right_customer.offsetWidth;
               right_customer.classList.add('swing-top');
               
               right_info.classList.remove('fade-in');
               right_info.offsetWidth=right_info.offsetWidth;
               right_info.classList.add('fade-in');
               
               right_manager.classList.remove('swing-bottom');
               right_manager.offsetWidth=right_manager.offsetWidth;
               right_manager.classList.add('swing-bottom');
            }, 2000);
            
            }
            //추가
            else if($(window).scrollTop()<=scroll_section3){  //section3
                $('.scroll0').css('width', '10px');
                $('.scroll1').css('width', '10px');
                $('.scroll2').css('width', '10px');
                $('.scroll3').css('width', '15px');
            }
            
        });
    
    
    //클릭하면 스크롤이동
    $('a').click(function () {
            $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);
            return false;
        });
};