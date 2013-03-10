var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket){

	socket.on('mouseMv', function(data){

		socket.emit("updateMouse", "bazinga");
		console.log(data);
	});

});