console.log('Starting App!');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const {ToDoApp} = require('./models/todoapp');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('req: ', req);
    res.send('GET request fired');
})

app.post('/todoapp', (req, res) => {
    console.log('Post req fired: ', req.body);
    const newToDo = new ToDoApp({
        taskName: req.body.taskName
    });
    newToDo.save().then((doc) => {
        console.log('Doc saved successfully');
        res.send(doc);
    }, (e) => {
        console.log('Error while saving doc: ', e);
        res.status(400).send(e);
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})