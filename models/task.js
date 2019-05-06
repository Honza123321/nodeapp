let mongoose = require('mongoose');
let sanitize = require('mongo-sanitize');

//Create a schema of data
let todoSchema = new mongoose.Schema({
        item: {
            type: String,
            require: true
        },
        deadline: {
            type: Date,
            require: true
        },
        author: {
            type: String,
            require: true
        },
        state: {
            type: String,
            default: 'TODO'
        }
    },
    {
        timestamps: true
    }
);


todoSchema.statics.getTasks = function(username, state, callback) {
    if(!state || state === "ALL"){
        Todo.find({author: sanitize(username)}, function (err, data) {
            if(err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    }else{
        Todo.find({author: sanitize(username), state: sanitize(state)}, function (err, data) {
            if(err) {
                return callback(err);
            } else {
                return callback(null, data);
            }
        });
    }
};

// todoSchema.statics.getTasksByState = function(username, state, callback) {
//
//     if(!state){
//         Todo.find({author: sanitize(username)}, function (err, data) {
//             if(err) {
//                 return callback(err);
//             } else {
//                 return callback(null, data);
//             }
//         });
//     }else{
//         Todo.find({author: sanitize(username), state: sanitize(state)}, function (err, data) {
//             if(err) {
//                 return callback(err);
//             } else {
//                 return callback(null, data);
//             }
//         });
//     }
//
// };

todoSchema.statics.createTask = function(item, author, deadline, callback) {
    // console.log("Item: " + item);
    // console.log("Deadline: " + deadline);
    let task = new Todo({item: sanitize(item), deadline:sanitize(deadline), author:sanitize(author)});
    let ok  = task.save(function (err) {
        if(err) {
            return callback(err);
        } else {
            return callback(null);
        }
    });
};

todoSchema.statics.setState = function(id, state, callback) {
    let myQuery = { _id : id };
    let newValue = { $set: { state: sanitize(state) } };
    Todo.updateOne(myQuery, newValue, function(err, res) {
        if(res) {
            return callback(err);
        } else {
            return callback();
        }
    });
};

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;