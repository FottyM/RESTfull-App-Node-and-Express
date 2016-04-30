/**
 * Created by fotty on 4/30/16.
 */

var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var Book = require('./Models/bookModel');

var app = express();

var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {

        var query = req.query;
        Book.find(function (err,books) {
            
            if(err){
                res.status(500).send(err);
            }else {
                res.json(books);
            }
        })
});


app.use('/api',bookRouter);


var port = process.env.PORT || 3000;

app.get('/',function (req,res) {
    res.send("Welcome to my API SIR");

});


app.listen(port,function () {

    console.log('gulp running on localhost:'+ port);

});



