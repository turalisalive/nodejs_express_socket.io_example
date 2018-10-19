var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var events = require('events');
var fs = require('fs');
var myLogger = require('./lib/logger.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.io = io;
server.listen(80);

var mylog = new myLogger();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var userData;
const myEmitter = new events.EventEmitter();
var connectedUsers = {};

app.post('/sendNotificationToUI', function (req, res, next) {
    mylog.write("REQUEST", req);
    if (connectedUsers.hasOwnProperty(req.body.entity.userId)) {
        myEmitter.emit('sendNotification', req.body.entity)
    }
    else {
        console.log( 'user not found!' )
    }
    var response = 'Accepted!';
    res.body = response;
    res.end(response);
    mylog.write("RESPONSE", res);
});



io.on('connection', function (socket) {
    socket.emit('client_connect', {name: "name"});

    socket.on('set_user', function (data) {
        setClient(data, socket);
    });

    socket.on('disconnect', function (data) {                
        for(var key in connectedUsers){        
            if (connectedUsers[key].id == socket.id) {                   
                console.log(key + " user disconnected!");
                delete connectedUsers[key];
            }
        }
    });


});

/* Send notification */
myEmitter.on('sendNotification', function (data) {
    console.log(new Date());
    connectedUsers[data.userId].emit('newNotification', data);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
function setClient(userId, socket) {
    connectedUsers[userId] = socket;
    console.log(userId + " connected!");    
}


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;