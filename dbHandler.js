/**
 * Created by piyush on 5/2/17.
 */
'use strict';
const pg = require('pg');

let client;
// const conStr = "postgres://testuser@localhost:5432/testdb";
function createClient() {
    client = new pg.Client({
        host : 'localhost',
        user : 'testuser',
        database : 'testdb',
        port : 5001
    });
    // client = new pg.Client(conStr);
}

module.exports = {
    addUser : function (name, callBack) {
        createClient();
        client.connect(function (err) {
            if(err)
                throw err;
        });
        client.query('INSERT INTO testtable(name) VALUES("$");', [name], function (err, result) {
            if(err)
                console.log('2'+err);
            callBack();
        });
        // client.end();
    },
    fetchUser : function (callBack) {
        createClient();
        client.connect();
        client.on('error', function (err) {
            console.error(err);
        });
        client.query('SELECT * FROM testtable;', function (err, rows, fields) {
            callBack(rows);
        });
        client.end();
    }
};