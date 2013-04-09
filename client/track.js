var socket = io.connect('http://sol.local:4000');

// when connection to socket is established
socket.on('connect', function(){

	socket.emit('setBrowser', {
		os: BROWSER.getOS(),
		browser: BROWSER.getBrowser(),
		version: BROWSER.getVersion(),
		size: BROWSER.getSize()
	})


	document.addEventListener('mousemove', function(e){

		socket.emit('mouseMv', {x: e.clientX, y: e.clientY});
	});

	document.addEventListener('click', function(e){

		socket.emit('getDetails', {x: e.clientX, y: e.clientY, clicked: true});
	});
});
