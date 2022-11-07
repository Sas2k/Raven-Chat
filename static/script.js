var socket = io.connect(location.port ? 'http://' + document.domain + ':' + location.port : 'http://' + document.domain);

function scrollToBottom() { 
    var chatBox = document.querySelector('.chat-box');
    var chatBoxy = chatBox.getBoundingClientRect().bottom;
    window.scrollTo(0, chatBoxy);
}

socket.on( 'connect', function() {
    socket.emit( 'my event', {
        data: 'User Connected'
    } )
    var form = $( 'form' ).on( 'submit', function( e ) {
        e.preventDefault()
        let user_name = $( 'input.username' ).val()
        let user_input = $( 'input.message' ).val()
        if (user_input && user_name){
            socket.emit( 'my event', {
                user_name : user_name,
                message : user_input
            } )
            $( 'input.message' ).val( '' ).focus()
        } else {
            alert("Can't send this since the username or message is empty.")
            $( 'input.message' ).val( '' ).focus()
        }
    } )
} )
socket.on( 'my response', function( msg ) {
    console.log( msg )
    if( typeof msg.user_name !== 'undefined' ) {
        let color;
        switch(msg.user_name.charAt(0)){
            case "!":
                color = "#00F"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "@":
                color = "#0F0"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "#":
                color = "#0FF"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "$":
                color = "#F00"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "%":
                color = "#F0F"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "^":
                color = "#FF0"
                msg.user_name = msg.user_name.substring(1);
                break;
            case "&":
                color = "#FFF"
                msg.user_name = msg.user_name.substring(1);
            default:
                color = "#000"
                break;
        }
        $( 'h3' ).remove()
        $( 'div.message_holder' ).append(`<div class="messageBlock"><b id="username-message"${color ? ' style="color: ' + color + ';"' : ''}>`+msg.user_name+'</b><p id="username-message" class="text-center">'+msg.message+'</p></div>' )
        scrollToBottom();
    }
});