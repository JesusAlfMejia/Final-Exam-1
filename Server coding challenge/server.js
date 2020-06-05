const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const app = express();
const {Movies} = require("./models/movie-model");
const {Actors} = require("./models/actor-model");


app.patch('/api/delete-movie-actor/:movie_ID', errorHandler, (req, res) => {
    let {movieId, fName, lName} = req.body;
    let paramMovieId = req.params.movie_ID;

    Actors
        .getActorByName(fName, lName)
        .then(searchedActor => {
            Movies
            .removeActorFromMovieList(movieId, searchedActor)
            .then(response => {
                return res.status(201).json(response);
            })
            .catch(err =>{
                res.statusMessage = err.message;
                return res.status(400).end()
            })
        })
        .catch(err =>{
            res.statusMessage = err.message;
            return res.status(400).end()
        })
   
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});