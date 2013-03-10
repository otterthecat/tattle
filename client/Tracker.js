(function(){

	/* Private Properties
	******************************************************* */

	var _history = {
		mousePath: 		new Array(), 	// array to store mouse position as it moves
		clicks: 		new Array(), 	// array of objects that each store event's x/y position and target element
		keystrokes: 	new Array(), 	// array of objects that each stores target element and keystrokes
		touches: 		new Array(), 	// array of objects that each store event's x/y and target element
		timestamp: 		null
	};

	/* Private Functions
	******************************************************* */

	var _track_mouse = function(obj){

		document.addEventListener("mousemove", function(e){

			var d = {x: e.clientX, y: e.clientY};
			obj.push(d); 
			socket.emit("mouseMv", d);
			
		}, false);
	};

	var _track_click = function(obj){

		document.querySelector("a").addEventListener("click", function(e){

				var d = {target: e.currentTarget, x: e.clientX, y: e.clientY};
				obj.push(d);
				socket.emit("click", d);
		}, false);
	};

	/* Public Object
	******************************************************* */

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

	window.TRACKER = new Tracker();
})();