// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var Bear     = require('./app/models/bear');


//console.log(Bear);


var port = process.env.PORT || 80;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();        
      // get an instance of the express Router

 router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.' + req);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
var Bear     = require('./app/models/bear');

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        console.log("ashish" + req.body.name);
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.hobbies = req.body.hobbies;
        // save the bear and check for errors
        //console.log(bear);
        bear.save(function(err) {
            if (err)
                res.send(err);
            console.log(bear);
            res.json({ message: 'Bear created!' });
        });
        
    })

    .get(function(req, res) {
    	//alert("hello");
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });



router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            console.log("ashish jindal");
            res.json(bear);
        });
    });




var Location  = require('./app/models/locations');

router.route('/location')

 .post(function(req, res) {
        
        var location = new Location();      // create a new instance of the Bear model
        location.name = req.body.name; 
        location.save(function(err) {
            if (err)
                res.send(err);
           // console.log(bear);
            res.json({ message: 'Location created!' });
        });
        
    })

    .get(function(req, res) {
        //alert("hello");
        Location.find(function(err, locations) {
            if (err)
                res.send(err);

            res.json(locations);
        });
    });


var Doctor  = require('./app/models/doctors');

router.route('/doctor')

 .post(function(req, res) {
        
        var doctor = new Doctor();      // create a new instance of the Bear model
        doctor.name = req.body.name; 
        doctor.age = req.body.age; 
        doctor.save(function(err) {
            if (err)
                res.send(err);
           // console.log(bear);
            res.json({ message: 'Doctor created!' });
        });
        
    })

    .get(function(req, res) {
        //alert("hello");
        Doctor.find(function(err, doctors) {
            if (err)
                res.send(err);

            res.json(doctors);
        });
    });


app.use('/api', router);
app.use("/public", express.static("/var/www/html/ashish/" + "/public"));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);



