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

    // 지도 찍는 곳입니다~!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var mapContainer = document.getElementsByClassName('map')[0];
    var mapOption = {
        center: new kakao.maps.LatLng(37.631719, 127.077487), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨 
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);  // 지도 생성
    if (navigator.geolocation) {
        // 접속 위치 얻기
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var locPosition = new kakao.maps.LatLng(lat, lon);
            var message = '<div style="">여기 계신가요?</div>';
            map.setCenter(locPosition);
            displayMarker(locPosition, message);
        });
    } else {
        var locPosition = new kakao.maps.LatLng(37.631719, 127.077487);
        map.setCenter(locPosition);
    }

    // 지도에 마커와 인포 윈도우 표시하는 함수
    function displayMarker(locPosition, message) {
        // 마커를 생성합니다

        var imageSrc = '/media/like.png',
            imageSize = new kakao.maps.Size(30, 30);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage
        });

        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: iwContent
        });

        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);

    }

    var rawData = document.getElementById('resultData').value;
    var data = JSON.parse(rawData);

    // DB에서 불러온 위치정보를 통해 지도에 표시
    if (data) {


        for (var i = 0; i < data.length; i++) {
            coords = new kakao.maps.LatLng(data[i].s_location_lat, data[i].s_location_long);
            message = '<div>' + data[i].s_name + '</div>';

            var pathLine = new kakao.maps.Polyline({
                path: [mapOption.center, coords]
            });
            var distance = Math.round(pathLine.getLength());
            data[i].distance = distance;

            displayMarker(coords, message);
        }

        // 현재 위치에서 가까운 거리 순으로 정렬
        data.sort(function (a, b) {
            return a.distance < b.distance ? -1 : 1;
        });
        /* div id = productList에 뿌리면 됨!
         쿼리문 SELECT * FROM stores, goods라서 원하는 거 다 가져다 쓸 수 있음!
         거리는 data[i].distance 입니당~
         동적으로 생성되어서 이벤트 주고싶을 땐, $(document).on("click", "#btn", function(){ 이런식으로 쓰면 됩니당~*/

        var productList = document.getElementById('productList');
        var index = 1;
        var str = '';

        $.each(data, function (i, items) {
            str += '<tr><td>' + index + '</td>';
            str += '<td>' + items.g_name + '</td>';
            str += '<td>' + items.s_name + '</td>';
            str += '<td>' + items.g_account + '원</td>';
            str += '<td>' + items.g_stock_num + '</td>';
            str += '<td>' + items.distance + 'm</td>';
            str += '<td>' + '<input type="button" value="장바구니 담기" class="put_cart">' + '</td></tr>';
            index++;
        });
        $(productList).append(str);
    }
    $('.put_cart').click(function () {
        var str = '';
        var tdArr = new Array();
        var checkBtn = $(this);
        var tr = checkBtn.parent().parent();
        var td = tr.children();
        var gg_name = td.eq(1).text();
        var ss_name = td.eq(2).text();
        var gg_stock_num = td.eq(4).text();
        $('#ss_name').val(ss_name);
        $('#gg_name').val(gg_name);
        $('#gg_stock_num').val(gg_stock_num);
        onSubmit();

    });

    function onSubmit() {
        var frm = document.frm;
        var url = '/cart_add';
        window.open('/cart_add', 'cart_add_pop', 'width=600, height=350, left=450, top=170, resizable=no, scrollbars=no');
        frm.action = '/cart_add';
        frm.method = "GET";
        frm.target = 'cart_add_pop';
        frm.submit();
    }
    
    $('#searchProductForm').submit(function(){
        if(!$('#keyword').val()){
            alert('검색어를 입력해주세요.');
            return false;
        }
        return true;
    });
    
    if(!data){
        $('.map').css('display', 'none');
        $('#table_name').css('display', 'none');
        $('#table_scroll').css('display', 'none');
        document.getElementById('keyword_text').innerHTML ='검색 결과가 없습니다.';
    }    
});