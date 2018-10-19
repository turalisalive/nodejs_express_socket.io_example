var socket = io('http://192.168.35.64:80');
// var socket = io('http://localhost:80');
socket.on('client_connect',function (data) {
	// console.log(data);
	socket.emit('set_user','111123');

	socket.on( 'newNotification', function(data){
		console.log(data);
		$("#test").append(data.message);
	})
});
// console.clear();
