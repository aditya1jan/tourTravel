var express = require('express')
var http = require('http')
var app = express();
var bodyParser=require("body-parser");
var user = require('./routes/user')
var multer = require('multer')
const DIR = './uploads';


let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});

let upload = multer({storage: storage});

var mssql    = require('mssql');
var connection = {
    server: 'bookingdb.cfrh4xcfymob.us-east-2.rds.amazonaws.com',
    user: 'bookingDB',
    password: 'bookingDB',
    database : 'tourTravelBook',
    options: {
      enableArithAbort: false
    }
};

mssql.connect(connection,function(err,result) {
if(err)
console.log(err);
else
console.log("result");
});

global.db = mssql;
global.conn = connection;


app.set('hostname', process.env.Host );
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.use('/resources',express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

http.createServer(app).listen(app.get('port'),'0.0.0.0' ,function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var router = express.Router();
app.get('/', function(req, res) {
  res.send("hhhhhhhhhhhhhhhhhhhhhhhhh");
})
app.use('/api/tourtravels', router);
router.get('/', function(req, res) {
    res.send("This is testing api url");
})

router.post('/User/signup',user.signup);
router.post('/User/login',user.login);
router.post('/User/forgetPassword',user.forgetPassword);
router.post('/User/otpAuth',user.otpAuth);
router.post('/User/resendOtp',user.resendOtp);


