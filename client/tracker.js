(function(){

	/* Private Properties
	******************************************************* */
	var _user = {
		id: 			null,
		userAgent: 		null,
		ipAddress: 		null,
		clientSize: 	null,			// object - stores width/height of browser
		screenSize: 	null,			// object - stores width/height of screen
		history: 		null 			// object - stores a copy of current history object
	};

	var _history = {
		mousePath: 		new Array(), 	// array to store mouse position as it moves
		clicks: 		new Array(), 	// array of objects that each store event's x/y position and target element
		keystrokes: 	new Array(), 	// array of objects that each stores target element and keystrokes
		touches: 		new Array(), 	// array of objects that each store event's x/y and target element
		timestamp: 		null
	}

	var _replay_data = null;
	var _path_marker = null;
	var _n = 0;

	/* Private Functions
	******************************************************* */
	var _get_agent = function(){

		return window.navigator.userAgent;
	};


	var _get_screen = function(){

		var scr = window.screen;
		return {x: scr.width, y: scr.width}
	};

	var _get_window = function(){

		return {x: window.innerWidth, y: window.innerHeight};
	};

	var _get_ip = function(){
		// this will be some sort of call to the server
		//  or perhaps read a property set by server
	};

	var _track_mouse = function(obj){

		document.addEventListener("mousemove", function(e){

			obj.push({x: e.clientX, y: e.clientY}); 
			
		}, false);
	};

	var _track_click = function(obj){

		document.querySelector("a").addEventListener("click", function(e){

				obj.push({target: e.currentTarget, x: e.clientX, y: e.clientY});
		}, false);
	}


	var _do_playback = function(){

		// clone node - do not got deep
		var clone = _path_marker.cloneNode(false)
		clone.style.left = _replay_data.details.mousePath[_n].x + "px";
		clone.style.top = _replay_data.details.mousePath[_n].y + "px";
		document.querySelector('body').appendChild(clone);

		_n ++;
	}


	/* Public Object
	******************************************************* */
	var User = function(){

		this.settings 				= 	_user;
		this.settings.userAgent 	=	_get_agent();
		this.settings.clientSize	= 	_get_window();
		this.settings.screenSize 	=	_get_screen();
	};

	User.prototype = {

		getID: function(){

			return this.settings.id
		},

		setID: function(id_value){

			this.settings.id = id_value;
		},

		setAgent: function(str){

			this.settings.userAgent = str;
		}
	};

	var Tracker = function(){

		this.details = _history;

		_track_mouse(this.details.mousePath);
		_track_click(this.details.clicks);
	}; 

	Tracker.prototype = {

		track: function(selector_str, event_str, fn){

			// query selector
			// 
			// apply event listener
			// 
			// run fn at event

		},

		getDetails: function(prop_str){

			if(this.details.hasOwnProperty(prop_str)){

				return this.details[prop_str];
			} else {

				return this.details;
			}
		}
	};


	var Replayer = function(){

		this.speed = 50;
		this.interval = null;
		this.data = null;
		_path_marker = document.createElement('div');
		_path_marker.className = "dot";
	};

	Replayer.prototype = {

		replay: function(obj){

			_replay_data = obj;
			this.interval = window.setInterval(_do_playback, this.speed);
		},

		stop: function(){

			window.clearInterval(this.interval);
		}
	};

	window.USER 		= new User();
	window.TRACKER 		= new Tracker();
	window.REPLAYER 	= new Replayer();

})();