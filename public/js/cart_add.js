//function addCookie() {
//    var number = Number($('#number').val());
//    var maxNum = Number($('#gg_stock_num').val());
//    
//    if(number>maxNum){
//        window.alert('현재 재고가 'maxNum+'개 입니다.');
//        return false;
//    }
//    return true;
//};

$(document).ready(function(){
    
    var selectPage = $('.select.page');
    var cartaddPage = $('.cartadd.page');
    
    cartaddPage.fadeOut(0);
    
    $('#minus').click(function() {
        var number = Number($('#number').val())-1;
        if(number>0) {
            $('#number').val(number);
        }
        else{
            alert('1개 이상만 가능합니다.');
        }
    });
    
    $('#minusminus').click(function() {
        var number = Number($('#number').val())-10;
        if(number>0) {
            $('#number').val(number);
        }
        else{
            alert('1개 이상만 가능합니다.');
        }
    });
    
    $('#plus').click(function() {
        var number = Number($('#number').val())+1;
        var maxNum = Number($('#gg_stock_num').val());
        if(number<=maxNum) {
            $('#number').val(number);
        }
        else{
            alert('현재 재고가 '+maxNum+'개 입니다.');
        }
    });
    
    $('#plusplus').click(function() {
        var number = Number($('#number').val())+10;
        var maxNum = Number($('#gg_stock_num').val());
        if(number<=maxNum) {
            $('#number').val(number);
        }
        else{
            alert('현재 재고가 '+maxNum+'개 입니다.');
        }
    });
    
    $('#cancel').click(function() {
        close();
    });
    
});
