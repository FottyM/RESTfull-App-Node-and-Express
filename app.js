/**
 * Created by fotty on 4/30/16.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParse = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./Models/bookModel');

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function (req,res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
        
    })
    
    .get(function (req, res) {

        var query = {};

        if( req.query.genre){

            query.genre = req.query.genre
        }

        Book.find(function (err,books) {
            
            if(err){
                res.status(500).send(err);
            }else {
                res.json(books);
            }
        })
});

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {

        Book.findById(req.params.bookId,function (err,books) {

            if(err){
                res.status(500).send(err);
            }else {
                res.json(books);
            }
        })
    }
);

app.use('/api',bookRouter);




app.get('/',function (req,res) {
    res.send("Welcome to my API SIR");

});


app.listen(port,function () {

    console.log('gulp running on localhost:'+ port);

});



