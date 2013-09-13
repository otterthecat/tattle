(function(){

    var location = window.location;
    var hash = location.hash;
    var path = location.pathname;
    var _count = 0;

    var _loadScript = function(script_path, callback_obj) {

        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = script_path;

        newScript.onload = function() {

          callback_obj.call(callback_obj.scope, callback_obj.arg);
        };

        document.getElementsByTagName('body')[0].appendChild(newScript);
    };


    var HashController = function(options){

        this.hash =  hash;
        this.path =  path;
        this.location =  location;
    }

    HashController.prototype = {

        init: function(){

            // only call init() once
            if(_count < 1){

                this.routeHash(this.hash);
            }
            _count += 1;
        },

        routeHash: function(hash){

            _loadScript("client/" + hash.substr(1, hash.length) + ".js", function(){});
        }
    };


    window.HASH_CONTROLLER = new HashController();
})();