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
    var cart = $('#cart').val();
    var first = document.getElementById('first');
    
    if(cart=='null') {
        var errorstr = '장바구니가 비었습니다.';
        $(first).append(errorstr);
    }
    else {
        var output='';
        $(first).append(cart);

        $('.delete_cart').click(function() {
            var str='';
            var tdArr = new Array();
            var checkBtn = $(this);
            var tr = checkBtn.parent().parent();
            var td = tr.children();
            var g_name = td.eq(1).text();
            var s_name = td.eq(2).text();
            var number = td.eq(3).text();
            $('#g_name').val(g_name);
            $('#s_name').val(s_name);
            $('#number').val(number);
            onSubmit();
        });
    }
    
    function onSubmit() {
        var frm = document.frm;
        frm.action = '/delete_cart';
        frm.method="POST"
        frm.submit();
    }
    
    $('#product_buy').click(function() {
       onBuy(); 
    });
    
    function onBuy() {
        var frm2 = document.frm2;
        var url = '/cart_buy';
        window.open('/cart_buy','cart_buy_pop', 'width=700, height=600, left=400, top=70, resizable=no, scrollbars=yes');
        frm.action='/cart_buy';
        frm.method="GET";
        frm.target='cart_buy_pop';
        frm.submit();
    }
    
    
};