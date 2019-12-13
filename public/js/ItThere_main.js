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
        
        //스크롤 이벤트
        $(window).scroll(function() {
            //추가
            if($(window).scrollTop()==0) { //section0
                $('.scroll0').css('width', '15px');
                $('.scroll1').css('width', '10px');
                $('.scroll2').css('width', '10px');
                $('.scroll3').css('width', '10px');
            }
            else if($(window).scrollTop()<=scroll_section1) { //section1
                img.item(0).classList.remove('slide-top');
                img.item(0).offsetWidth=img.item(0).offsetWidth;
                img.item(0).classList.add('slide-top');
                
                main_search.classList.remove('slide-top');
                main_search.offsetWidth=main_search.offsetWidth;
                main_search.classList.add('slide-top');
                
                //추가
                $('.scroll0').css('width', '10px');
                $('.scroll1').css('width', '15px');
                $('.scroll2').css('width', '10px');
                $('.scroll3').css('width', '10px');
            }
            
            else if($(window).scrollTop()<=scroll_section2){ //section2
                block.item(0).classList.remove('expand');
                block.item(0).offsetWidth=block.item(0).offsetWidth;
                block.item(0).classList.add('expand');
                
                user.item(0).classList.add('slide-top');
                manager.item(0).classList.add('slide-top');
                //추가
                $('.scroll0').css('width', '10px');
                $('.scroll1').css('width', '10px');
                $('.scroll2').css('width', '15px');
                $('.scroll3').css('width', '10px');
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