const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let sanitize = require('mongo-sanitize');


// basic schema, only username and password
let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

// authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: sanitize(username) })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                let err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            // bcrypt compare method
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })
        });
};

UserSchema.statics.addUser = function (username, password, callback) {
   var user = new User({username:sanitize(username), password:sanitize(password)});
   user.save(function (err) {
       if(err) {
           return callback(err);
       } else {
           return callback(null);
       }
   });
};


/*
* Mongooose pre-hook executes before each save
* hashing a password before saving it to the database
*/
UserSchema.pre('save', function (next) {
    let user = this;
    // bcrypt hash method
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});


let User = mongoose.model('User', UserSchema);
module.exports = User;