/**
 * Created by Nishanth on 1/24/2016.
 */
/**
 * Created by Nishanth on 11/18/2015.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ["male", "female","dont wish to disclose"]
    },
    Phone: {
        type: String
    }

});





module.exports = mongoose.model('User', userSchema);
