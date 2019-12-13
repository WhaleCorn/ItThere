window.onload = function () {

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

    var arrow_left = document.getElementsByClassName('left').item(0);
    var arrow_right = document.getElementsByClassName('right').item(0);
    var list_table = document.getElementsByClassName('list_table2').item(0);
    var colgroup_str = '<colgroup><col width="10%"/><col width="40%"/><col width="20%"/><col width="20%"/><col width="10%"/></colgroup>';

    var index = 1;
    var str = '<tr>';
    var s_idx = $('#s_idx').val();
    var beforeStoreIndex, afterStoreIndex;
    var storeName;
    function getProductList() {
        $.ajax({
            url: '/manager/getProductList',
            dataType: 'json',
            type: 'GET',
            data: {
                storeIndex: s_idx
            },
            cache: false,
            success: function (data) {
                str = '<tr>';
                if (data.result) {
                    $(list_table).empty();
                    $.each(data.result, function (index, item) {
                        str += '<td><input type="hidden" class="g_idx" value="' + item.g_idx + '"/>' + (index + 1) + '</td><td>' + item.g_name + '</td><td>' + item.g_account + '</td><td><input type="text" style="width:50px;" class="stock" value="' + item.g_stock_num + '"/></td><td>' + '<input type="button" class="modifyProductBtn" value="수정">' + '<input type="button" class="deleteProductBtn" value="delete">' + '</td></tr>';
                    });
                    $(list_table).append(colgroup_str);
                    $(list_table).append(str);
                }
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
            getProductList();
            $('#s_idx').val(s_idx);

        } else {
            alert('마지막 매장입니다.');
        }
    });
    $(arrow_left).click(function () {
        if (beforeStoreIndex) {
            s_idx = beforeStoreIndex;
            $('#s_idx').val(s_idx);
            getProductList();
        } else {
            alert('첫 매장입니다.');
        }

    });


    $(document).on("click", '.modifyProductBtn', function () {
        var index = $('.modifyProductBtn').index(this);
        var goodsIndex = $('.g_idx').eq(index).val();
        var newStockNum = $('.stock').eq(index).val();
        if (newStockNum < 0) {
            alert('0 이상의 수만 가능합니다.');
        } else {
            $.ajax({
                url: '/modifyProduct',
                dataType: 'json',
                data: {
                    goodsIndex: goodsIndex,
                    newStockNum: newStockNum
                },
                cache: false,
                success: function (data) {
                    getProductList();
                    // 왜 알림 안나오지,,,
                    alert('성공적으로 업데이트 되었습니다.');

                }
            })

        }
    });
    var addRowDisplay = false;
    $('#product_add').click(function(){
        if (addRowDisplay) {
            if (!$('#newGoodsBarcode').val() || !$('#newGoodsName').val()) {
                $('#newGoodsBarcode').focus();
                $('#newGoodsBarcode').empty();
                $('#newGoodsName').empty();
                alert('바코드를 다시 입력해주세요.');
                var uri = '/barcode';
                var name = 'barcode';
                var options = 'width=570, height=350, resizable=no, scrollbars=no';
                barcodeWindow(uri, name, options, getBarcodeInfo);

            }
            else if ($('#newGoodsStockNum').val() < 0) {
                $('#newGoodsStockNum').focus();
                $('#newGoodsStockNum').empty();
                alert('재고 수는 0 이상만 가능합니다.');
            } else {
                insertProduct();
                $('tr:last').remove();
                addRowDisplay = false;
            }
        } else {
            var output = `<tr id="newRow">
                        <td><input type="text" name="newGoodsBarcode" id="newGoodsBarcode"></td>
                        <td><input type="hidden" name="newGoodsCategory" id="newGoodsCategory" readonly>
                            <input type="text" name="newGoodsName" id="newGoodsName"readonly/></td>
                        <td><input type="text" name="newGoodsPrice" id="newGoodsPrice"/></td>
                        <td><input type="text" name="newGoodsStockNum" id="newGoodsStockNum" value="0"/></td>
                        <td><input type="hidden"/></td>
                        </tr>`;
            $(list_table).append(colgroup_str);
            $(list_table).append(output);
            $('#newRow td input').css('width', '100px');
            var uri = '/barcode';
            var name = 'barcode';
            var options = 'width=570, height=350, resizable=no, scrollbars=no';
            barcodeWindow(uri, name, options, getBarcodeInfo);
            addRowDisplay = true;
        }
    });
    var barcodeWindow = function(uri, name, options, closeCallback){
        var win = window.open(uri, name, options);
        var interval = window.setInterval(function(){
            try{
                if(win == null || win.closed){
                    window.clearInterval(interval);
                    closeCallback(win);
                }
            }catch(e){
            }
        }, 1000);
        return win;
    };
    function getBarcodeInfo(win) {

        var newGoodsBarcode = $('#newGoodsBarcode').val();
        if(newGoodsBarcode){
        $.ajax({
            url: '/manager/getBarcodeInfo',
            dataType: 'json',
            type: 'get',
            data: {
                newGoodsBarcode: newGoodsBarcode
            },
            cache: false,
            success: function (data) {
                if (data.message == 'success') {
                    document.getElementById('newGoodsCategory').value = data.newGoodsCategory;
                    document.getElementById('newGoodsName').value = data.newGoodsName;
                    document.getElementById('newGoodsPrice').value = data.newGoodsPrice;
                } else {

                    document.getElementById('newGoodsCategory').value = '';
                    document.getElementById('newGoodsName').value = '';
                    document.getElementById('newGoodsPrice').value = '';
                }
            },
            error: function (request, status, error) {
                alert("code = " + request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
            }

        })
    }
    };

    function insertProduct() {
        newGoodsCategory = $('#newGoodsCategory').val();
        newGoodsName = $('#newGoodsName').val();
        newGoodsPrice = $('#newGoodsPrice').val();
        newGoodsStockNum = $('#newGoodsStockNum').val();
        s_idx = $('#s_idx').val();
        $.ajax({
            url: '/manager/insertProduct',
            dataType: 'json',
            type: 'POST',
            data: {
                newGoodsCategory: newGoodsCategory,
                newGoodsName: newGoodsName,
                newGoodsPrice: newGoodsPrice,
                newGoodsStockNum: newGoodsStockNum,
                s_idx: s_idx
            },
            cache: false,
            success: function (data) {
                if (data.message == 'success') {
                    getProductList();
                } else {
                    alert(data.message);
                    getProductList();
                }
            }
        })
    }
    function deleteProduct() {
        var index = $('.deleteProductBtn').index(this);
        var goodsIndex = $('.g_idx').eq(index).val();
        $.ajax({
            url: '/manager/deleteProduct',
            dataType: 'json',
            type: 'get',
            data: {
                goodsIndex: goodsIndex
            },
            cache: false,
            success: function (data) {
                if (data.message == 'success') {
                    getProductList();
                } else {
                    alert(data.message);
                }
            }
        })

    }
    $(document).on("click", '.deleteProductBtn', function () {
        deleteProduct();
    });
    getProductList();

}