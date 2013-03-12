var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/test");

var Plot_Schema = new Schema({
	x: {type: Number, default: 0},
	y: {type: Number, default: 0},
	el: {type: Schema.Types.Mixed, default: null}
});

var Tracker_Schema = new Schema({

	mousePath: 		[Plot_Schema], 						// array to store mouse position as it moves
	timestamp: 		{type: Date, default: Date.now} 	// time when tracking started for user	
});


var Tracker = mongoose.model('Tracker', Tracker_Schema);

exports.mongoose = mongoose;
exports.Schema = Schema;
exports.Tracker_Schema = Tracker;
exports.tracker = new Tracker();