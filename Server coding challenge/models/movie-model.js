const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieById : function(movieID){
        return moviesCollection
            .find({movie_ID: movieID})
            .then( foundMovie => {
                return foundMovie;
            })
            .catch( err => {
                throw new Error(err);
            })
    },
    removeActorFromMovieList: function (movieID, actorDelete){
        return moviesCollection
            .findOneAndUpdate({movie_ID:movieID}, {$pullAll: {actors : actorDelete}})
            .then(deletedActor => {
                return deletedActor;
            })
            .catch(err => {
                throw new Error(err);
            })
                
    }
}

module.exports = {
    Movies
};

