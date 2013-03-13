(function(){

	/* Private Properties
	******************************************************* */

	var _replay_data 	= null;

	var _path_marker 	= document.createElement('div');
	_path_marker.className = "dot";

	var _interval 		= null;
	var _speed			= 50
	var _n 				= 0;


	/* Private Functions
	******************************************************* */

	var _do_playback = function(){

		if(_replay_data.length - 1 < _n){
			window.clearInterval(_interval);
			return false;
		}

		// clone node - do not got deep
		var clone = _path_marker.cloneNode(false)
		clone.style.left = _replay_data[_n].x + "px";
		clone.style.top = _replay_data[_n].y + "px";
		console.log(_replay_data[_n].clicked);
		if(_replay_data[_n].clicked === true){

			var el = document.elementFromPoint(_replay_data[_n - 1].x, _replay_data[_n - 1].y);
			el.style.backgroundColor = "#ff0033";
		}

		document.querySelector('body').appendChild(clone);

		_n ++;
	};

	/* Public Object
	******************************************************* */
	
	var Replayer = function(){};

	Replayer.prototype = {

		replay: function(obj){

			_replay_data = obj;
			_interval = window.setInterval(_do_playback, _speed);
		},

		stop: function(){

			window.clearInterval(_interval);
		}
	};

	window.REPLAYER = new Replayer();
})();