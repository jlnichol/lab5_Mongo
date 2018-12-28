var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });

});

router.delete('/comment', function(req, res, next) {
    console.log("in delete");
      Comment.find({}).remove( function(err, commentList) {
            if (err) {console.log(err);} //If there's an error, print it out
            else {
                res.sendStatus(200);
            }
        })
    
})

router.get('/comment', function(req, res, next) {
    var name = req.query["q"];
    if(name) {
        console.log("over here the name is ", name);
        // Comment.find({Name:"Sue"},function(err, commentList) {
        //     var obj;
        //     if(name) {
        //         obj={Name:name};
        //     }
        Comment.find({ Name: req.query["q"] }, function(err, commentList) {
            if (err) {console.log(err);} //If there's an error, print it out
            else {
                res.json(commentList);
            }
        })

    }
    else {
        Comment.find(function(err, commentList) { //Calls the find() method on your database
            if (err) {console.log(err);} //If there's an error, print it out
            else {
                console.log("the name is ", name);
                res.json(commentList);
                //res.send(commentList); //Otherwise console log the comments you found
            }
        })

    }

});



module.exports = router;
