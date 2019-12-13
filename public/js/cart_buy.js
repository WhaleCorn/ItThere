$(document).ready(function(){
    
    var cart = $('#cart').val();
    var list_table = document.getElementById('list_table');
    var sum_account = 0;
    
    $('#sum_account').val(sum_account);
    
    $(list_table).append(cart);
    
    $('#cancel').click(function() {
        close();
    });
    
    for(var i=0;i<list_table.rows.length;i++) {
        var ss_name = list_table.rows[i].cells[3];
        var s_name = $(ss_name).text();
        var gg_name = list_table.rows[i].cells[2];
        var g_name = $(gg_name).text();
        getAccount(i, s_name, g_name);
    }
    
    $('.buy_check').change(function() {
       var tdArr = new Array();
        var checkBtn = $(this);
        var tr = checkBtn.parent().parent();
        var td = tr.children();
        var now_account = td.eq(5).text();
        var now_number = td.eq(4).text();
        var total = parseInt(now_account)*parseInt(now_number);
        if( $(this).is(":checked")==true ) {
            sum_account += parseInt(total);
        }
        else {
            sum_account -= parseInt(total);
        }
        
        $('#sum_account').val(sum_account);
    });
    
    $('#all').change(function() {
       if($(this).is(":checked")==true){
           sum_account=0;
           $('.buy_check').prop("checked", true);
           for(var i=0;i<list_table.rows.length;i++){
               var now1 = list_table.rows[i].cells[5];
               var now_account = $(now1).text();
               var now2 = list_table.rows[i].cells[4];
               var now_number = $(now2).text();
                sum_account += parseInt(now_account) * parseInt(now_number);
               $('#sum_account').val(sum_account);
           }
       } 
        else{
            $('.buy_check').prop("checked", false);
            sum_account=0;
            $('#sum_account').val(sum_account);
        }
    });
    
    var check = document.getElementsByClassName('buy_check');
   var buy_List = new Array();
    
    $('#buy').click(function() {
        for(var i=0;i<list_table.rows.length;i++){
            var now_check = (check).item(i);
            if( $(now_check).is(":checked")==true ){
            var now_index = list_table.rows[i].cells[1];
            var this_index = $(now_index).text();
                var now_g_name = list_table.rows[i].cells[2];
                var g_name = $(now_g_name).text();
                var now_s_name = list_table.rows[i].cells[3];
                var s_name = $(now_s_name).text();
                var now_number = list_table.rows[i].cells[4];
                var number = $(now_number).text();
                changeStock(g_name, s_name, number);
            buy_List.push(this_index);
            }
        }
        var total = $('#sum_account').val();
        alert(total+'원 결제가 완료되었습니다.');
//        opener.document.location.href='/Cart';
      opener.document.getElementById('child_value').value = buy_List;
        window.close();
    });
    
    var account = document.getElementsByClassName('account');
    
    function getAccount(i, s_name, g_name) {
            $.ajax({
                url:'/getAccount',
                dataType:'json',
                type:'GET',
                data: {s_name: s_name, g_name: g_name},
                cache: false,
                success: function(result) {
                    var now = (account).item(i);
                    $(now).append(result.result);
                }  
            });
        }
    
    function changeStock(g_name, s_name, number) {
        $.ajax({
           url:'/changeStock',
            dataType:'json',
            type:'POST',
            data: {g_name:g_name, s_name:s_name, number:number},
            cache: false,
            success: function(result) {
            }
        });
    }
    
});