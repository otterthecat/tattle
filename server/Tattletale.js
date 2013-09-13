var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId

mongoose.connect("mongodb://localhost/test");

var Plot_Schema = new Schema({

    x: {type: Number, default: 0},              // mouse x position
    y: {type: Number, default: 0},              // mouse y position
    scrollY: {type: Number, default: 0},         // window's scrollY value
    clicked: {type: Boolean, default: false},    // boolean to check if mouse was clicked at point x & y
    uri: {type: String, default: ''}
});


var Tattletale_Schema = new Schema({

    mousePath:      [Plot_Schema],                                  // array to store mouse position as it moves
    timestamp:      {type: Date, default: Date.now},                // time when tracking started for user
    browser:        {
                        name: {type: String, default: 'nil'},       // browser name (Firefox, Chrome, etc)
                        version: {type: String, default: '0'},      // version number of browser
                        os: {type: String, default: 'nil'},         // os type (OSX, Windows, Linux, etc)
                        width: {type: Number, default: 0},          // browser window width
                        height: {type: Number, default: 0}          // browser window height
                    }
});

Tattletale_Schema.methods.findByBrowser = function(browser_str, callback){

    this.model('Tattle').find({'browser.name': browser_str}, function(err, data){

        callback(data);
    });
};

// TODO : should be able to use native findById method
Tattletale_Schema.methods.findById = function(id, callback){


    this.model('Tattle').findOne({"_id": ObjectId.fromString(id)}, function(err, data){

        callback(data);
    });
};

var Tattletale = mongoose.model('Tattle', Tattletale_Schema);

exports.mongoose = mongoose;
exports.schema = Schema;
exports.model = Tattletale;
exports.objectId = ObjectId;