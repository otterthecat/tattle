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

	/* Public Object
	******************************************************* */
	var User = function(){

		_user.userAgent 	=	_get_agent();
		_user.clientSize	= 	_get_window();
		_user.screenSize 	=	_get_screen();
	};

	User.prototype = {

		getID: function(){

			return _user.id
		},

		setID: function(id_value){

			_user.id = id_value;
		},

		setAgent: function(str){

			_user.userAgent = str;
		}
	};

	window.USER = new User();
})();