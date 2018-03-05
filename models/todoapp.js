var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoAppSchema = new Schema({
  taskName: {
      type: String
  },
  isCompleted: {
      type: Boolean,
      default: false
  }
});

const ToDoApp = mongoose.model('ToDoApp', todoAppSchema);

module.exports = {ToDoApp}