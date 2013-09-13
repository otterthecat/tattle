var io = require('socket.io').listen(4000);
//var tracker = require("./Tracker.js");
var tattletale = require("./Tattletale");
var tattler = new tattletale.model();
var objectId = tattletale.objectId;

var db = tattletale.mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

    io.sockets.on('connection', function(socket){


        socket.on('setBrowser', function(data){

            tattler.browser.name    = data.browser;
            tattler.browser.version = data.version;
            tattler.browser.os      = data.os;
            tattler.browser.width   = data.size.x;
            tattler.browser.height  = data.size.y;
        });

        // when mouse is moving, add a new coord object
        // to the mousePath array
        socket.on('mouseMv', function(data){

            tattler.mousePath.push(data);
        });

        socket.on('scroll', function(data){

            tattler.mousePath.push(data);
        });

        socket.on('passUri', function(uri){

            if(!tattler.hasUri(uri.data)){

                var o = {};
                o[uri.data] = [];
                tattletale.schema.add(o);
            }
        });

        // currently this event triggers form the index.html file
        // by clicking anywhere within the page
        socket.on('getDetails', function(data){

            tattler.mousePath.push(data);
            tattler.save(function(err){

                tattletale.model.find(function(err, tracks){

                    socket.emit("returnDetails", tracks[tracks.length-1]);
                });
            });
        });

        // request to get tattle collection
        socket.on('getCollections', function(){

            tattletale.model.find(function(err, collections){

                socket.emit('returnCollections', collections);
            });
        });


        socket.on('request_details_by_browser', function(str_browser){

            tattler.findByBrowser(str_browser, function(data){

                socket.emit('return_details_from_browser', data);
            });
        });


        socket.on('request_details_by_id', function(str_id){

            tattler.findById(str_id, function(data){

                socket.emit('return_details_from_id', data);
            });
        });
    });
});