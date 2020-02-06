const db = require('../models');

exports.createMovie = async (req, res) => {
    console.log(req.db)
    try {
        let newMovie = await db.Movie.create(req.body);
        console.log(newMovie);
        return res
                .status(200)
                .json({
                    message: 'New movie successfully created',
                    newMovie
                })
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! Movie creation failed',
            error: err
        })
    }
};

exports.readAllMovies = async (req, res) => {
    if (req.query.producer) {return this.readWithFilter(req, res);}
    if (req.query.isOscarWinner) {return this.getOscarWinners(req, res);}
    try {
        let movies = await db.Movie.find();
        return res
                .status(200)
                .json(movies)
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find movies',
            error: err
        })
    }
};

exports.readOneMovie = async (req, res) => {
    try {
        let thisMovie = await db.Movie.findById(req.params.id);
        return res
                .status(200)
                .json(thisMovie)
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find the movie',
            error: err
        })
    }
};

exports.readWithFilter = async (req, res) => {
    try {
        let thisMovie = await db.Movie.find(req.query)
        .sort({date: 1})
        .select({ title: 1, producer: 1, releaseDate: 1});
        return res
                .status(200)
                .json(thisMovie)
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find the movie',
            error: err
        })
    }
};

exports.getOscarWinners = async (req, res) => {
    try {
        let thisMovie = await db.Movie.find(req.query)
        return res
                .status(200)
                .json(thisMovie)
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find the movie',
            error: err
        })
    }
};

exports.updateMovie = async (req, res) => {
    try {
        let movieToUpdate = await db.Movie.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new: true});
        return res
                .status(200)
                .json({
                    message: "Your movie has been updated",
                    movieToUpdate})
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find the movie',
            error: err
        })
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        await db.Movie.findByIdAndRemove(req.params.id);
        return res
                .status(200)
                .json({
                    message: "Your movie has been removed"})
    } catch (err) {
        return res.status(400).json({
            message: 'Ooops ! could not find the movie',
            error: err
        })
    }
};