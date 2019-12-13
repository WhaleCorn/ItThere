window.onload = function () {

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

    var arrow_left = document.getElementsByClassName('left').item(0);
    var arrow_right = document.getElementsByClassName('right').item(0);
    var list_table = document.getElementsByClassName('list_table2').item(0);
    var colgroup_str = '<colgroup><col width="10%"/><col width="40%"/><col width="20%"/><col width="20%"/><col width="10%"/></colgroup>';

    var index = 1;
    var str = '<tr>';
    var s_idx = $('#s_idx').val();
    var beforeStoreIndex, afterStoreIndex;
    var storeName;
    function getMarketInfo() {
        $.ajax({
            url: '/manager/getMarketInfo',
            dataType: 'json',
            type: 'GET',
            data: {
                storeIndex: s_idx
            },
            cache: false,
            success: function (data) {
                if (data.result) {
                    str='';
                    var item = data.result[0];
                    $(list_table).empty();
                    str += '<tr><th>상점 명</th><td>' + item.s_name + '</td></tr>';
                    str += '<tr><th>상점 위치</th><td>' + item.s_location +' '+ item.s_location_detail+'</td></tr>';
                    str += '<tr><th>상점 전화번호</th><td>' + item.s_tell + '</td></tr>';
                    str += '<tr><th>상점 이미지</th><td><img src="/' + item.storeImage + '" width="100px"/></td></tr>';
                    str += '<tr><th></th><td><input type="button" value="delete"></td></tr>';
                }
                $(list_table).append(colgroup_str);
                $(list_table).append(str);

                beforeStoreIndex = data.beforeStoreIndex;
                afterStoreIndex = data.afterStoreIndex;
                storeName = data.storeName;
                $('#s_name').val(storeName);
            }
        })
    };
    $(arrow_right).click(function () {
        if (afterStoreIndex) {
            s_idx = afterStoreIndex;
            getMarketInfo();
            $('#s_idx').val(s_idx);

        } else {
            alert('마지막 매장입니다.');
        }
    });
    $(arrow_left).click(function () {
        if (beforeStoreIndex) {
            s_idx = beforeStoreIndex;
            $('#s_idx').val(s_idx);
            getMarketInfo();
        } else {
            alert('첫 매장입니다.');
        }

    });

    $('#market_modify').click(function(){
        var targetIndex =document.getElementById('s_idx').value;
        location.href='/manager/market/modify?marketIndex='+targetIndex;
    });
    getMarketInfo();
};
