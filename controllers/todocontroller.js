//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
let Todo = require('../models/task');
let bodyParser = require('body-parser');
let urlEncoderParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.get('/todo/', function (req, res) {
        let username = req.session.loggedUser.username;
        let state = req.query.state;
        // console.log("STATE:" + state);
        Todo.getTasks(username, state, function (err, data) {
            if(err) {
                res.render('error')
            } else {
                res.render('todo',{todos: data});
            }
        });
    });

    app.get('/todo/getTasks', function (req, res) {
        let username = req.session.loggedUser.username;
        let state = req.query.state;
        Todo.getTasks(username, state, function (err, data) {
            if(err) {
                res.send(JSON.stringify());
            } else {
                res.send(JSON.stringify({todos: data}));
            }
        });
    });
    //
    // app.get('/todo/getTasksByState', function (req, res) {
    //     let username = req.session.loggedUser.username;
    //     let state = req.query.state;
    //     console.log("STATE: " + state);
    //     Todo.getTasksByState(username, state, function (err, data) {
    //         if(err) {
    //             res.send(JSON.stringify());
    //         } else {
    //             res.send(JSON.stringify({todos: data}));
    //         }
    //     });
    // });

    app.post('/todo/createTask', urlEncoderParser, function (req, res) {
        let item = req.body.task;
        let author = req.session.loggedUser.username;
        let deadline = req.body.deadline;
        Todo.createTask(item, author, deadline, function (err) {
            if(err) {
                console.log(err);
                return;
            } else {
                console.log(err);
                return;
            }
        });
    });

    app.post('/todo/deleteTask/:id', function (req, res) {
        Todo.find({_id: req.params.id}).remove(function (err, data) {
            if (err) throw err;
            res.json(data);

        });
    });


    //
    // app.delete('/todo/:id', function (req, res) {
    //     //delete the requested item from mongodb
    //     Todo.find({_id: req.params.id}).remove(function (err, data) {
    //         if (err) throw err;
    //         res.json(data);
    //
    //     });
    // });

    app.post('/todo/setCompleteState/:id', function (req, res) {
        Todo.setState({_id: req.params.id}, 'COMPLETED', function (err) {
            if(err) {
                console.log(err);
                return res.end('NOK');
            } else {
                return res.end('OK');
            }
        });
    });

    app.post('/todo/setTodoState/:id', function (req, res) {
        Todo.setState({_id: req.params.id}, 'TODO', function (err) {
            if(err) {
                //console.log(err);
                return res.end('NOK');
            } else {
                return res.end('OK');
            }
        });
    });

};


/*
* { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }*/