console.log('Starting App!');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {ToDoApp} = require('./models/todoapp');

const app = express();
app.use(bodyParser.json());

app.get('/todoapp', (req, res) => {
    ToDoApp.find().then((docs) => {
        console.log('docs: ', docs);
        res.send(docs);
    }, (e) => {
        console.log('Error while retrieving docs: ', e);
        res.status(400).send(e);
    })
    

})

app.get('/todoapp/:id', (req, res) => {
    var id = req.params.id;
    ToDoApp.findById(id).then((doc) => {
        if (!doc) {
            return res.status(404).send('Doc not found');
        }
        res.send(doc);
    }, (e) => {
        console.log('Error while retrieving doc: ', e);
        res.status(400).send(e);
    })
    

})

app.patch('/todoapp/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['taskName', 'isCompleted']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
  
    if (_.isBoolean(body.isCompleted) && body.isCompleted) {
      body.completedAt = new Date().getTime();
    } else {
      body.isCompleted = false;
      body.completedAt = null;
    }
  
    ToDoApp.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
  
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });

app.delete('/todoapp/:id', (req, res) => {
    var id = req.params.id;
    ToDoApp.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send('Doc not found');
        }
        res.send(doc);
    }, (e) => {
        console.log('Error while deleting doc: ', e);
        res.status(400).send(e);
    })
    

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