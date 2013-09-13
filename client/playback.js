var socket = io.connect('http://127.0.0.1:4000');

// when connection to socket is established
socket.on('connect', function(){

    // set up event to recieve tattle collection
    socket.on('returnCollections', function(data){

        var sel = document.createElement('select');
        sel.name = 'tracks';
        var opt = document.createElement('option');
        var clone;

        for(var i = 0; i < data.length; i += 1){

            clone = opt.cloneNode();
            clone.innerHTML = data[i]._id;
            clone.value = data[i]._id;

            sel.appendChild(clone);
        };

        document.getElementsByTagName('body')[0].appendChild(sel);

        sel.addEventListener('change', function(){
            socket.emit('request_details_by_id', this.value);
        });
    });


    socket.on('return_details_from_id', function(data){
        REPLAYER.replay(data.mousePath);
    });


    // make call to get tattle collection
    socket.emit('getCollections');
});
