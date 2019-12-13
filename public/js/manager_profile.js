window.onload=function() {
    
    menu_list = document.getElementById('menu_list');
    menu_opa = document.getElementById('menu_opa');
    menu = document.getElementsByClassName('menu').item(0);
    menu2 = document.getElementsByClassName('menu').item(1);
	
	$('.info2').fadeOut(0);
    
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
	
	var rawData = document.getElementById('manager_db_info').value;
    var data = JSON.parse(rawData);
	var login_mode = document.getElementById('login_mode').value;
	var modifyStr = document.getElementById('modifyStr');
	
	$('#manager_id').val(data[0].m_id);
	$('#manager_password').val(data[0].m_pw);
	$('#manager_name').val(data[0].m_name);
	if(login_mode=="2") { $('#manager_mode').val('Manager'); }
	
	$('.modify_info').click(function() {
//		alert($(this).children().text());
		if($(this).children().text()=='정보 수정') {
			$('.info2').fadeIn(0);
			$('.info1').fadeOut(0);
			
			$('#manager_password').removeAttr('readonly');
			$('#manager_password').animate({width:'250px'},500);
			$('#manager_name').removeAttr('readonly');
			$('#manager_name').animate({width:'250px'},500);
		}
		else{
			$('.info1').fadeIn(0);
			$('.info2').fadeOut(0);
			
			$('#manager_password').attr('readonly', true);
			$('#manager_password').animate({width:'170px'},500);
			$('#manager_name').attr('readonly', true);
			$('#manager_name').animate({width:'170px'},500);
			
			if($('#manager_password').val()=='' || $('#manager_name').val()==''){
				alert('빈 항목이 존재합니다.');
				location.reload();
			}else {
				changeProfile($('#manager_password').val(), $('#manager_name').val());
			}
		}
	});
	
	$('#drop_info').click(function() {
		$.ajax({
			url:'/drop_manager',
			dataType:'json',
			type:'POST',
			cache: false,
			success: function(result) {
				alert(result.result);
			}
		});
	});
	
	
	function changeProfile(new_password, new_name) {
		$.ajax({
			url:'/manager/changeProfile',
			dataType:'json',
			type:'POST',
			data:{new_password:new_password, new_name:new_name},
			cache: false,
			success: function(result) {
				alert(result.result);
			}
		});
	}
};