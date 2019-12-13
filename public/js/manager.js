window.onload = function() {
    
    $('.grey1').fadeOut(0);
    $('.grey2').fadeOut(0);
    $('.grey3').fadeOut(0);
    $('.grey4').fadeOut(0);
  
    $('.img1').mouseover(function() { $('.grey1').fadeIn(300); $(this).animate({width:'+=5%'},300); });
    $('.img1').mouseout(function() { $('.grey1').fadeOut(300); $(this).animate({width:'-=5%'},300); });
    
    $('.img2').mouseover(function() { $('.grey2').fadeIn(300); $(this).animate({width:'+=5%'},300); });
    $('.img2').mouseout(function() { $('.grey2').fadeOut(300); $(this).animate({width:'-=5%'},300); });
    
    $('.img3').mouseover(function() { $('.grey3').fadeIn(300); $(this).animate({width:'+=5%'},300); });
    $('.img3').mouseout(function() { $('.grey3').fadeOut(300); $(this).animate({width:'-=5%'},300); });
    
    $('.img4').mouseover(function() { $('.grey4').fadeIn(300); $(this).animate({width:'+=5%'},300); });
    $('.img4').mouseout(function() { $('.grey4').fadeOut(300); $(this).animate({width:'-=5%'},300); });
    
}