const express = require('express');
const router = express.Router();
const handlersMovies = require('../handlers/movies');

router.route('/')
    .post(handlersMovies.createMovie)
    .get(handlersMovies.readAllMovies);

router.route('/:id')
    .get(handlersMovies.readOneMovie)
    .put(handlersMovies.updateMovie)
    .delete(handlersMovies.deleteMovie);

module.exports = router;