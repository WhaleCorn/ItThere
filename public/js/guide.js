window.onload=function() {
    
    //스크롤 기능
    var section = new Array();
    section[0] = $(".section0").offset();
    section[1] = $(".section1").offset();
    section[2] = $(".section2").offset();
    
    $('.section0').on('mousewheel',function(e){
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
        else{}
    });


    logo = document.getElementsByClassName('logo');
    section0_text = document.getElementsByClassName('section0_text');
    contents1 = document.getElementsByClassName('contents1');
    
    logo.item(0).classList.add('slide-top');
    section0_text.item(0).classList.add('slide-top');
    contents1.item(0).classList.add('slide-top');
    
    //스크롤 이벤트에 쓸 변수
    scroll_section1 = $('.section1').offset().top;
    scroll_section2 = $('.section2').offset().top;

    //스크롤 이벤트
    $(window).scroll(function() {
        if($(window).scrollTop()<scroll_section1) { //section0 
            logo.item(0).classList.remove('slide-top');
            logo.item(0).offsetWidth=logo.item(0).offsetWidth;
            logo.item(0).classList.add('slide-top');

            section0_text.item(0).classList.remove('slide-top');
            section0_text.item(0).offsetWidth=section0_text.item(0).offsetWidth;
            section0_text.item(0).classList.add('slide-top');
        }
        else if($(window).scrollTop()<scroll_section2) { //section1
            contents1.item(0).classList.remove('slide-top');
            contents1.item(0).offsetWidth=contents1.item(0).offsetWidth;
            contents1.item(0).classList.add('slide-top');           
        }
    }); 

    //링크 클릭 애니메이션
    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    //버튼 클릭 div 변경
    $(function (){ 
        $('#u_button').addClass('active');
        $('#u_wrapper').css('opacity',1);
        $('#m_wrapper').css('opacity', 0);
    });

    $('#u_button').on('click', function(){
        $(this).addClass('active');
        $('#m_button').removeClass('active');
        $('#u_wrapper').css('z-index', '3');
        $('#m_wrapper').css('z-index', '2');
        $('#m_wrapper').fadeTo(500,0);
        $('#u_wrapper').fadeTo(500,1);
    });

    $('#m_button').on('click', function(){
        $(this).addClass('active');
        $('#u_button').removeClass('active');
        $('#m_wrapper').css('z-index', '3');
        $('#u_wrapper').css('z-index', '2');
        $('#u_wrapper').fadeTo(500,0);
        $('#m_wrapper').fadeTo(500,1);
    });
    
    $('.mem0').hover(function user() {
        $(this).animate({width:"50%", opacity:1},1500);
        $('.mem1').animate({width:"10%", opacity:0.6},1500);
        $('.mem2').animate({width:"10%", opacity:0.6},1500);
        $('.mem3').animate({width:"10%", opacity:0.6},1500);
        $('.mem0_pop').animate({opacity:1},1500);
        $('.mem1_pop').animate({opacity:0},1500);
        $('.mem2_pop').animate({opacity:0},1500);
        $('.mem3_pop').animate({opacity:0},1500);
        $('.mem0_pop img').animate({opacity:1},1500);
        $('.mem1_pop img').animate({opacity:0},1500);
        $('.mem2_pop img').animate({opacity:0},1500);
        $('.mem3_pop img').animate({opacity:0},1500);
    });

    $('.mem1').hover(function user() {
        $(this).animate({width:"50%", opacity:1},1500);
        $('.mem0').animate({width:"10%", opacity:0.6},1500);
        $('.mem2').animate({width:"10%", opacity:0.6},1500);
        $('.mem3').animate({width:"10%", opacity:0.6},1500);
        $('.mem0_pop').animate({opacity:0},1500);
        $('.mem1_pop').animate({opacity:1},1500);
        $('.mem2_pop').animate({opacity:0},1500);
        $('.mem3_pop').animate({opacity:0},1500);
        $('.mem0_pop img').animate({opacity:0},1500);
        $('.mem1_pop img').animate({opacity:1},1500);
        $('.mem2_pop img').animate({opacity:0},1500);
        $('.mem3_pop img').animate({opacity:0},1500);
    });
    
    $('.mem2').hover(function() {
        $(this).animate({width:"50%", opacity:1},1500);
        $('.mem0').animate({width:"10%", opacity:0.6},1500);
        $('.mem1').animate({width:"10%", opacity:0.6},1500);
        $('.mem3').animate({width:"10%", opacity:0.6},1500);
        $('.mem0_pop').animate({opacity:0},1500);
        $('.mem1_pop').animate({opacity:0},1500);
        $('.mem2_pop').animate({opacity:1},1500);
        $('.mem3_pop').animate({opacity:0},1500);
        $('.mem0_pop img').animate({opacity:0},1500);
        $('.mem1_pop img').animate({opacity:0},1500);
        $('.mem2_pop img').animate({opacity:1},1500);
        $('.mem3_pop img').animate({opacity:0},1500);
    });
    
    $('.mem3').hover(function() {
        $(this).animate({width:"50%", opacity:1},1500);
        $('.mem0').animate({width:"10%", opacity:0.6},1500);
        $('.mem1').animate({width:"10%", opacity:0.6},1500);
        $('.mem2').animate({width:"10%", opacity:0.6},1500);
        $('.mem0_pop').animate({opacity:0},1500);
        $('.mem1_pop').animate({opacity:0},1500);
        $('.mem2_pop').animate({opacity:0},1500);
        $('.mem3_pop').animate({opacity:1},1500);
        $('.mem0_pop img').animate({opacity:0},1500);
        $('.mem1_pop img').animate({opacity:0},1500);
        $('.mem2_pop img').animate({opacity:0},1500);
        $('.mem3_pop img').animate({opacity:1},1500);
    });

}