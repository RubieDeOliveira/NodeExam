const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then( () => console.log('Connected to movies DB...'))
    .catch( err => console.error(`Error connecting to DB : ${err}`));

// Exporting all models
module.exports.Movie = require('./movies');
