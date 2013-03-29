var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/test");

var Plot_Schema = new Schema({
	x: {type: Number, default: 0},
	y: {type: Number, default: 0},
	clicked: {type: Boolean, default: false}
});

var Tattletale_Schema = new Schema({

	mousePath: 		[Plot_Schema], 						// array to store mouse position as it moves
	timestamp: 		{type: Date, default: Date.now}, 	// time when tracking started for user
	browser: 		{type: String, default: 'nil'},		// string of browser type (IE, FF, Chrome, etc)
	version: 		{type: String, default: '0'} 		// version of the browser
	os: 			{type: String, default: 'nil'}		// the OS of the client's computer
	width:          {type: Number, default: 0}			// width of browser window
	height: 		{type: Number, default 0}			// height of browser window 
});


var Tattletale = mongoose.model('Tattle', Tattletale_Schema);

exports.mongoose = mongoose;
exports.schema = Schema;
exports.model = Tattletale;