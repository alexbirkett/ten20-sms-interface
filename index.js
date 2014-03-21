/**
 * Created by alex on 21/03/14.
 */
var express = require('express');
var app = express();
var async = require('async');

var net = require('net');

app.get('/sms', function (req, res) {
    console.log(req.headers);
    console.log(req.query);

    var options = { port: 1337, host: 'ten20live.com'};

    var socket;
    async.series([
        function (callback) {
            socket = net.createConnection(options, callback);
        }, function (callback) {
            socket.write(req.query.msg, callback);
        }
    ], function (err) {
        if (err) {
            res.json({}, 500);
        } else {
            res.json({});
        }
        socket.end();
    });
});

var server = app.listen(5000, function () {
    console.log('Listening on port %d', server.address().port);
});