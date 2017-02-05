/**
 * Created by piyush on 5/2/17.
 */
'use strict';
const pg = require('pg');

let client;
function createClient() {
    client = new pg.Client({
        host : 'localhost',
        user : 'testuser',
        password : '12345',
        database : 'testdb',
        port : 5432
    });
}

module.exports = {
    addUser : function (name, callBack) {
        createClient();
        client.connect(function (err) {
            if(err)
                throw err;
        });
        client.query("INSERT INTO testtable(name) VALUES($1);", [name], function (err, result) {
            client.end();
            if(err)
                console.error(err);
            else
                callBack('user entered');
        });

    },
    fetchUser : function (callBack) {
        createClient();
        client.connect();
        client.on('error', function (err) {
            console.error(err);
        });
        client.query('SELECT * FROM testtable;', function (err, rows, fields) {
            client.end();
            if(err)
                console.error(err);
            else
                callBack(rows);
        });
    }
};