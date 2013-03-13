var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/test");

var Plot_Schema = new Schema({
	x: {type: Number, default: 0},
	y: {type: Number, default: 0},
	el: {type: Schema.Types.Mixed, default: null}
});

var Tattletale_Schema = new Schema({

	mousePath: 		[Plot_Schema], 						// array to store mouse position as it moves
	timestamp: 		{type: Date, default: Date.now} 	// time when tracking started for user	
});


var Tattletale = mongoose.model('Tattle', Tattletale_Schema);

exports.mongoose = mongoose;
exports.schema = Schema;
exports.model = Tattletale;