
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



/* Public Object
******************************************************* */

var pushTo = function(prop_str, obj){

	if(_history.hasOwnProperty(prop_str)){

		_history[prop_str].push(obj);
	}
};

var getDetails = function(prop_str){

	if(_history.hasOwnProperty(prop_str)){

		return _history[prop_str];
	} else {

		return _history;
	}
};

/* Exports
******************************************************* */
exports.pushTo 		= pushTo;
exports.getDetails 	= getDetails;