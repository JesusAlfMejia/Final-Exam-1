const {Actors} = require("../models/actor-model");
const {Movies} = require("../models/movie-model");

function errorHandler(req, res, next) {
    let {movieId, fName, lName} = req.body;
    let paramMovieId = req.params.movie_ID;
    if(!movieId){
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end();
    }
    else if(movieId != paramMovieId){
        res.statusMessage = "id and movie_ID do not match ";
        return res.status(409).end();
    }
    else if(!fName || !lName){
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        return res.status(403).end();
    }
    Actors
        .getActorByName(fName, lName)
        .then(response => {
            console.log(response);
            if(response.length <= 0){
                res.statusMessage = "The actor or movie do not exist";
                return res.status(201).end();
            }
        })
        .catch(err => {
            res.statusMessage = "The actor or movie do not exist";
            return res.status(201).end();
        })
    Movies
        .getMovieById(movieId)
        .then(response => {
            console.log(response);
            if(response.length <= 0){
                res.statusMessage = "The actor or movie do not exist";
                return res.status(201).end();
            }
        })
        .catch(err => {
            res.statusMessage = "The actor or movie do not exist";
            return res.status(201).end();
        })
    next();
}

module.exports = errorHandler;