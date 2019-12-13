/*document.documentElement.scrollTop = 0;*/

window.onload=function() {
    
    setTimeout(function() {
        var mouse = document.getElementsByClassName('middle');
        mouse.item(0).style.visibility="visible";
    },2500);
    
    block = document.getElementsByClassName('block');
    scroll_section1 = $('.section1').offset().top;
    scroll_section1-=10;
    $(window).scroll(function() {
        if($(window).scrollTop()>=scroll_section1){
            block.item(0).classList.remove('kenburns-top');
            block.item(0).offsetWidth=block.item(0).offsetWidth;
            block.item(0).classList.add('kenburns-top');
        }
    });
    
    /*
    $('.block').addClass('kenburns-top');
    
    block = document.getElementsByClassName('block');
    block.item(0).addEventListener("mouserover", function(e) {
        alert('d');
        e.preventDefault;
        
        block.item(0).classList.remove('kenburns-top');
        block.item(0).offsetWidth=block.item(0).offsetWidth;
    }, false);*/
    
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
    
};

/*$(window).scroll(function() {
   var offset_section2 = $(".section2").offset();
    $('html, body').animate({scrollTop : offset_section2.top},400);
});*/