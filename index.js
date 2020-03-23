require('dotenv').config();
const db = require('./database');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/add-todo', (req, res) => {
    const newTodo = new db.Todo({
        title: req.body.title, 
        body: req.body.body, 
        isDone: req.body.isDone, 
        date: new Date()});

    newTodo.save((err, todo) => {
        if(err) {
            res.err(err);
            return;
        }

        res.send(todo);
    });
});

app.get('/todo', (req, res) => {
    db.Todo.find({}, (err, todos) => {
        if(err) {
            res.err(err);
            return;
        }

        res.send(todos);
    })
});

app.delete('/todo', (req, res) => {
    db.Todo.findByIdAndDelete(req.body.id, (err, todo) => {
        if(err) {
            res.err(err);
            return;
        }

        res.send(todo);
    })
});

app.patch('/todo', (req, res) => {
    const update = {};
    req.body.body ? update.body = req.body.body : null;
    req.body.title ? update.title = req.body.title : null;
    req.body.isDone ? update.title = req.body.isDone : null;

    db.Todo.findByIdAndUpdate(req.body.id, update, {useFindAndModify: false},(err, todo) => {
        if(err) {
            res.err(err);
            return;
        }

        res.send(todo);
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!!`));