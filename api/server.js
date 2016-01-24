/**
 * Created by Nishanth on 1/13/2016.
 */
var express = require('express');
var app = express();
//var lowdb = require('lowdb');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/news");
var User    = require('./models/users');

var bodyParser = require('body-parser');
var path = require('path');
//var low = require('lowdb');
var _ = require('lodash');
const storage = require('lowdb/file-async');
//const db = low('../data/users.json', {storage:storage});

var jwt = require('jsonwebtoken');
//var expressJwt = require('express-jwt');
//s
var secret = "ACMEfinancial";
var apiRoutes = express.Router();


//low.path='../data/users.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static((path.resolve('../client'))));
app.use(express.static((path.resolve('../client/bower_components'))));



apiRoutes.use(function(req,res,next){
  //  console.log(req.headers);
    var bearerToken = req.headers.authorization;
    var userToken = bearerToken.split(' ')[1];

    if(userToken){
        jwt.verify(userToken, secret , function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {

                req.decoded = decoded;
            //    console.log("verified");
                next();
            }
        });

    } else {


        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});
//j
apiRoutes.get('/verify',function(req,res){
   // console.log("inside verify");
    res.send({redirect: 'profile'});
});



app.get('/',function(req,res){

    res.sendFile(path.resolve('../Client/index.html'));
});

app.get('/data',function(req,res){
  //var user = db('users').find({email: 'henderson.briggs@geeknet.net'});
   //console.log(user);
});

app.post('/signup',function(req,res){
    var user = new User();
    console.log("user:" + req.body.username + "is signing up");

    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if(err){
            res.send(err);
        }
        else{
            ///  console.log("user saved to database");
            res.send({redirect : 'logIn'});
        }
    });

});

app.post('/login',function(req,res){
  //  console.log(req.body.email + '  ' +req.body.password);
   var email = req.body.email;
    var query = {email : email};

    User.findOne(query, function(err,doc) {
        if (!doc) {
            //   console.log("1");
            res.send({errorMessage: "This is not a registered Email. Please retry!", errorCode: 400})
        }

        else if (doc.password === req.body.password) {
            //    console.log("2");
            console.log("from server");
            console.log(doc);
            var user = doc;

             delete user.password;


            var token = jwt.sign(user, secret, {expiresIn: 3600});
            res.json({token: token});
        }
        else {
            //    console.log("3");
            res.send({errorMessage: "Incorrect Password. Please try again", errorCode: 401})
        }
    });


});

apiRoutes.post('/editProfile', function(req,res){

    var editedUserCred = req.body;
//    console.log("request body");
 //   console.log(req.body);
    //var User = db('users').find({guid : editedUserCred.guid});
    /*console.log(User);
       User.name.first = editedUserCred.name.first;
       User.name.last = editedUserCred.name.last;
       User.age = editedUserCred.age;
       User.phone = editedUserCred.phone;
       User.address = editedUserCred.address;
       User.email = editedUserCred.email;
       User.eyeColor = editedUserCred.eyeColor;
       User.company = editedUserCred.company;*/

      // db.saveSync('../data/usercs.json');
   /* console.log(User);
        res.send({redirect:'profile'});
*/
           _.assign( db('users').find({guid: editedUserCred.guid }), {
            address : editedUserCred.address,
            company : editedUserCred.company,
            age: editedUserCred.age,
            phone : editedUserCred.phone,
            eyeColor: editedUserCred.eyeColor,
            email: editedUserCred.email
        });
    _.assign( db('users').find({guid: editedUserCred.guid }), {
        address : editedUserCred.address,
        company : editedUserCred.company,
        age: editedUserCred.age,
        phone : editedUserCred.phone,
        eyeColor: editedUserCred.eyeColor,
        email: editedUserCred.email
    });
    res.send({redirect:'profile'});

});
app.use('/auth',apiRoutes);
app.listen(3000);
console.log("Server Running at 3000!");