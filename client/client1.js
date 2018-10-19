// var socket = io('http://localhost:80/test');
var socket = io('http://localhost:80');
socket.on('client_connect',function (data) {
    // console.log(data);
    socket.emit('set_user','asdasdasdasdasdasdasd');

    socket.on( 'newNotification', function(data){
        console.log(data);
        $("#test").append(data.message);
    })
});
