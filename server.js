/**
 * Created by piyush on 5/2/17.
 */
'use strict';
const express = require('express');
const db = require('./dbHandler');

const app = express();

app.set('port', process.env.PORT || 5000);
app.use('/', express.static(__dirname + '/public_html'));

app.get('/add', function (req, res) {
    db.addUser(req.query.name, function () {
        res.send('user entered');
    });
});

app.get('/fetch', function (req, res) {
    db.fetchUser(function (result) {
        res.send(result);
    });
});

app.listen(app.get('port'), function () {
    console.log('http://localhost:' + app.get('port') );
});