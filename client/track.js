var socket = io.connect('http://127.0.0.1:4000');

// when connection to socket is established
socket.on('connect', function(){

    socket.emit('setBrowser', {
        os: BROWSER.getOS(),
        browser: BROWSER.getBrowser(),
        version: BROWSER.getVersion(),
        size: BROWSER.getSize()
    })


    var _uri = window.location.pathname;

    document.addEventListener('mousemove', function(e){

        socket.emit('mouseMv', {x: e.clientX, y: e.clientY, uri: _uri});
    });

    document.addEventListener('click', function(e){

        socket.emit('getDetails', {x: e.clientX, y: e.clientY, clicked: true, uri: _uri});
    });


    window.addEventListener('scroll', function(e){

     var yPos = this.scrollY;

     socket.emit('scroll', {scrollY: yPos});
    });
});
