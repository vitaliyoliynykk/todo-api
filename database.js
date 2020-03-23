const mongoose = require('mongoose');
mongoose.connect(
`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0-gofet.mongodb.net/test?retryWrites=true&w=majority`, 
{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => console.error('Connection error:', err));
db.once('open', () => console.log('connected scuccessfully'));

const todoSchema = new mongoose.Schema({
    title: String,
    date: Date,
    body: String,
    isDone: Boolean
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports.Todo = Todo;