var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost:27017');

var Book = require('./models/bookModel');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Success!");
});

app.use('/api/books', bookRouter);


app.use('/', function (req, res) {
    res.send('Welcome to my API!');
});

app.listen(process.env.PORT, function () {
    console.log('Listening port:' + process.env.PORT);
});