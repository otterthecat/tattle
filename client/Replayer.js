(function(){

    /* Private Properties
    ******************************************************* */

    var _replay_data    = null;

    var _path_marker    = document.createElement('div');
    _path_marker.className = "dot";

    var _interval       = null;
    var _speed          = 50
    var _n              = 0;


    /* Private Functions
    ******************************************************* */

    var _create_overlay = function(){

        var div = document.createElement('div');
        div.id = "overlay";
        div.style.width = window.innerWidth;
        div.style.height = window.innerHeight;
        div.style.position = "absolute";
        div.style.top = 0;
        div.style.left = 0;

        document.body.appendChild(div);
    };


    var _do_playback = function(){

        if(_replay_data.length - 1 < _n){
            window.clearInterval(_interval);
            return false;
        }

        if(_replay_data[_n].uri === window.location.pathname){
            // clone node - do not got deep
            var clone = _path_marker.cloneNode(false)

            if(_replay_data[_n].clicked === true){

                var overlay = document.querySelector('#overlay');
                overlay.className += " hide";

                var el = document.elementFromPoint(_replay_data[_n].x, _replay_data[_n].y);
                el.click();

                clone.className = 'click';

                overlay.className = overlay.className.substr(0, (overlay.className.length-5));
            }

            if(_replay_data[_n].scrollY !== window.scrollY){

                window.scrollTo(0, _replay_data[_n].scrollY);
            }

            clone.style.left = _replay_data[_n].x + "px";
            clone.style.top = _replay_data[_n].y + "px";

            document.querySelector('#overlay').appendChild(clone);
        }
        _n ++;
    };

    /* Public Object
    ******************************************************* */

    var Replayer = function(){};

    Replayer.prototype = {

        replay: function(obj){

            _replay_data = obj;
            _create_overlay();
            _interval = window.setInterval(_do_playback, _speed);
        },

        stop: function(){

            window.clearInterval(_interval);
        }
    };

    window.REPLAYER = new Replayer();
})();