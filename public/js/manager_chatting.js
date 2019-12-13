window.onload=function() {
    
    menu_list = document.getElementById('menu_list');
    menu_opa = document.getElementById('menu_opa');
    menu = document.getElementsByClassName('menu').item(0);
    
    $(menu_list).animate({right:'-=35%'},0);
    
    $('.menu').click(function() {
        if($(menu_list).css('visibility')==='hidden') {
            $(menu_list).css({visibility:'visible'});
            $(menu_opa).css({visibility:'visible'});
            $(menu_list).animate({right:'+=35%'},500);
            $(menu).attr('src','/media/menu_white_after.png');
            menu.classList.remove('rotate-center');
            menu.offsetWidth=menu.offsetWidth;
            menu.classList.add('rotate-center');
        }
        else {
            setTimeout(function() {
                $(menu_list).css({visibility:'hidden'});
                $(menu).attr('src','/media/menu.png');
            },500);
            $(menu_opa).css({visibility:'hidden'});
            $(menu_list).animate({right:'-=35%'},500);
            menu.classList.remove('rotate-center');
            menu.offsetWidth=menu.offsetWidth;
            menu.classList.add('rotate-center');
        }
    });
    
};