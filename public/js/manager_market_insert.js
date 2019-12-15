$(document).ready(function () {

    menu_list = document.getElementById('menu_list');
    menu_opa = document.getElementById('menu_opa');
    menu = document.getElementsByClassName('menu').item(0);
    menu2 = document.getElementsByClassName('menu').item(1);

    var fix = document.getElementsByClassName('fix').item(0);
    fix.classList.add('slide-top');
    setTimeout(function () {
        fix.classList.remove('slide-top');
    }, 1500);

    berlin_offset = $('section').offset().top;
    $('#fix_hidden').fadeOut(0);
    $('.black').fadeOut(0);

    $(window).scroll(function () {
        if ($(window).scrollTop() >= berlin_offset - 10) {
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
            if ($(window).scrollTop() >= berlin_offset - 10) {
                $(menu2).attr('src', '/media/menu_white_after.png');
                menu2.classList.remove('rotate-center');
                menu2.offsetWidth = menu2.offsetWidth;
                menu2.classList.add('rotate-center');
                setTimeout(function () { menu2.classList.remove('rotate-center'); }, 1700);
            }
            else {
                $(menu).attr('src', '/media/menu_white_after.png');
                menu.classList.remove('rotate-center');
                menu.offsetWidth = menu.offsetWidth;
                menu.classList.add('rotate-center');
                setTimeout(function () { menu.classList.remove('rotate-center'); }, 1700);
            }
        }
        else {
            setTimeout(function () {
                $(menu_list).css({ visibility: 'hidden' });
                if ($(window).scrollTop() >= berlin_offset - 10) {
                    $(menu2).attr('src', '/media/menu_black.png');
                } else {
                    $(menu).attr('src', '/media/menu.png');
                }
                $('.session_info').css({ visibility: 'visible' });
            }, 500);
            $(menu_opa).css({ visibility: 'hidden' });
            $(menu_list).animate({ right: '-=35%' }, 500);
            if ($(window).scrollTop() >= berlin_offset - 10) {
                menu2.classList.remove('rotate-center');
                menu2.offsetWidth = menu2.offsetWidth;
                menu2.classList.add('rotate-center');
                setTimeout(function () { menu2.classList.remove('rotate-center'); }, 1700);
            }
            else {
                menu.classList.remove('rotate-center');
                menu.offsetWidth = menu.offsetWidth;
                menu.classList.add('rotate-center');
                setTimeout(function () { menu.classList.remove('rotate-center'); }, 1700);
            }
        }
    });

    var insertButton = document.getElementById('insertButton');
    $(insertButton).click(function () {
        $('#insertMarketForm').submit();
    });
});

function checkMarketForm() {

    if (!document.getElementById('storeName').value) {
        alert('상점 명을 입력해주세요.');
        document.getElementById('storeName').focus();
        return false;
    } else if (!document.getElementById('address').value) {
        alert('상점 위치를 입력해주세요.');
        return false;
    } else if (!document.getElementById('storeTell').value) {
        alert('전화번호를 입력해주세요.');
        document.getElementById('storeTell').focus();
        return false;
    } else {
        return true;
    }
}
