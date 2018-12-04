const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jeopardy', {
  useNewUrlParser: true,
});

const jeopardySchema = mongoose.Schema({
  firstRoundScore: Number,
  secondRoundScore: Number,
  date: Date,
});

const Jeopardy = mongoose.model('Jeopardy', jeopardySchema);

module.exports = Jeopardy;
