window.onload=function() {
    
    menu_list = document.getElementById('menu_list');
    menu_opa = document.getElementById('menu_opa');
    menu = document.getElementsByClassName('menu').item(0);
    menu2 = document.getElementsByClassName('menu').item(1);
    
    var fix = document.getElementsByClassName('fix').item(0);
    fix.classList.add('slide-top');
    setTimeout(function () {
        fix.classList.remove('slide-top');
    },1500);
    
    berlin_offset = $('section').offset().top;
    $('#fix_hidden').fadeOut(0);
    $('.black').fadeOut(0);
    
    $(window).scroll(function() {
        if($(window).scrollTop()>=berlin_offset-10) { 
            $('#fix_hidden').fadeIn(500);
            $('.black').fadeIn(500);
            $('.fix').fadeOut(500);
            $('.fix').fadeOut(500);
            $('.white').fadeOut(500);
        }
        else {
            $('#fix_hidden').fadeOut(500);
            $('.black').fadeOut(500);
            $('.fix').fadeIn(500);
            $('.white').fadeIn(500);
        }
    });


    $(menu_list).animate({ right: '-=35%' }, 0);

    $('.menu').click(function () {
        if ($(menu_list).css('visibility') === 'hidden') {
            $(menu_list).css({ visibility: 'visible' });
            $(menu_opa).css({ visibility: 'visible' });
            $('.session_info').css({ visibility: 'hidden' });
            $(menu_list).animate({ right: '+=35%' }, 500);
            if($(window).scrollTop()>=berlin_offset-10) {
                $(menu2).attr('src', '/media/menu_white_after.png');
                menu2.classList.remove('rotate-center');
                menu2.offsetWidth = menu2.offsetWidth;
                menu2.classList.add('rotate-center');
                setTimeout(function() { menu2.classList.remove('rotate-center'); },1700);
            }
            else {
                $(menu).attr('src', '/media/menu_white_after.png');
                menu.classList.remove('rotate-center');
                menu.offsetWidth = menu.offsetWidth;
                menu.classList.add('rotate-center');
                setTimeout(function() { menu.classList.remove('rotate-center'); },1700);
            }
        }
        else {
            setTimeout(function () {
                $(menu_list).css({ visibility: 'hidden' });
                if($(window).scrollTop()>=berlin_offset-10){
                    $(menu2).attr('src', '/media/menu_black.png');
                }else {
                    $(menu).attr('src', '/media/menu.png');
                }
                $('.session_info').css({visibility: 'visible'});
            }, 500);
            $(menu_opa).css({ visibility: 'hidden' });
            $(menu_list).animate({ right: '-=35%' }, 500);
            if($(window).scrollTop()>=berlin_offset-10){
                menu2.classList.remove('rotate-center');
                menu2.offsetWidth = menu2.offsetWidth;
                menu2.classList.add('rotate-center');
                setTimeout(function() { menu2.classList.remove('rotate-center'); },1700);
            }
            else {
                menu.classList.remove('rotate-center');
                menu.offsetWidth = menu.offsetWidth;
                menu.classList.add('rotate-center');
                setTimeout(function() { menu.classList.remove('rotate-center'); },1700);
            }
        }
    });
    var rawData = document.getElementById('resultData').value;
    var data = JSON.parse(rawData);
    var marketInfo = document.getElementById('marketInfo');
    var result_text = document.getElementById('result_text');
//    $.each(data, function(i, items) {}
    var index=1;
    if(data){
        $.each(data, function(i, items) {
            var output ='';
            output += '<div class="inside_info">'+index+'<span>'+data[i].s_name+'</span><img src="/media/arrow_down.png" class="arrow"></div>';
            
            output += '<div class="open_div"><img src="/'+data[i].storeImage+'" class="market_img">';
            output += '<table class="open_info"><tr><th>'+data[i].s_name+'</th></tr><tr><td class="td1">주소 : '+data[i].s_location+'</td></tr><tr><td class="td2">상세주소 : ';
            output += data[i].s_location_detail+'</td></tr><tr><td class="td3">전화번호 : '+data[i].s_tell+'</td><tr>';
            output += '<td class="td4"><div class="chat_start">관리자 : '+data[i].m_name+'</div><td></tr></table>';
            $(marketInfo).append(output);
            index++;
        });
        index-=1;
        $(result_text).val(index+'개의 검색결과');
    }
    
    $('.chat_start').click(function() {
       window.open('/chatting',name, 'resizable=no,width=500,height=700');
    });
    
//    $('.arrow').click(function() { alert( $('.arrow').index(this) ); });
	//$(menu2).attr('src', 'media/menu_white_after.png');
	//$('html, body').animate({scrollTop : section[2].top},400);
	//$(window).scrollTop()==0
	
	$('.arrow').click(function() {
		var index = $('.arrow').index(this);
		var arrow = document.getElementsByClassName('arrow').item(index);
		var open_div = document.getElementsByClassName('open_div').item(index);
		if($(open_div).css('display')=="none"){
			$(open_div).show();
			$(arrow).attr('src', '/media/arrow_up.png');
			$('html, body').animate({scrollTop : $(window).scrollTop()+300 },300);
			
		}
		else{
			$(open_div).hide();
			$(arrow).attr('src', '/media/arrow_down.png');
		}
	});
	
    
    
};