window.onload = function() {
    $('#msg').focus();
    
   var socket = io();
        
    var chatView = document.getElementById('chatView');
    var chatForm = document.getElementById('chatForm');
    
    var username = $('#current_user').val();
    var login_mode = $('#current_mode').val();
	var market = $('#market_name').val();
    
    if(username){
        socket.emit('add user', username);
    }
    socket.emit('market user', {username:username,market:market, login_mode:login_mode});
 
    chatForm.addEventListener('submit', function() {
        var msg = $('#msg');
 
        if (msg.val() == '') {
            return;
                
        } else {
            socket.emit('SEND', {msg:msg.val(), target:market, username:username, login_mode:login_mode});
			
            var msgLine = $('<div class="msgLine">');
            var msgBox = $('<div class="msgBox">');
 
            msgBox.append(msg.val());
            msgBox.css('display', 'inline-block');
 
            msgLine.css('text-align', 'right');
            msgLine.append(msgBox);
 
            $('#chatView').append(msgLine);
 
            msg.val('');
            $('#msg').focus();
            chatView.scrollTop = chatView.scrollHeight;
        }
    });
 
    socket.on('SEND', function(data) {
        var msgLine = $('<div class="msgLine">');
        var msgBox = $('<div class="msgBox">');
        msgBox.append(data.username + " : " +data.msg);
        msgBox.css('display', 'inline-block');
        
        msgLine.append(msgBox);
        $('#chatView').append(msgLine);

        chatView.scrollTop = chatView.scrollHeight;
    });
    
    socket.on('enter', function(data) {
        
        var enterLine = $('<div class="enterLine">')
        enterLine.append(data.msg);
        $('#chatView').append(enterLine);
        chatView.scrollTop = chatView.scrollHeight;
        
    });
    
    socket.on('user_enter', function(data) {
        var msgLine = $('<div class="msgLine">');
        var msgBox = $('<div class="msgBox">');
        msgBox.append(data.market + " : " +data.msg);
        msgBox.css('display', 'inline-block');
        
        msgLine.append(msgBox);
        $('#chatView').append(msgLine);

        chatView.scrollTop = chatView.scrollHeight;
    });
}