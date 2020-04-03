// Staggr [Node.JS Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

const sampleHomemadeData = {
    0: 123, // Hours 2400 to 0159
    2: 123, // Hours 0200 to 0359
    4: 123, // Hours 0400 to 0559
    6: 123, // Hours 0600 to 0759
    8: 123, // Hours 0800 to 0959
    10: 123, // Hours 1000 to 1159
    12: 123, // Hours 1200 to 1359
    14: 123, // Hours 1400 to 1559
    16: 123, // Hours 1600 to 1759
    18: 123, // Hours 1800 to 1959
    20: 123, // Hours 2000 to 2159
    22: 123, // Hours 2200 to 2359
}

// Include local environment variables
var dotenv = require('dotenv').config({path:__dirname + '/staggr.env', debug: process.env.DEBUG});

// Include web dependencies
var express = require('express');
var app = express();
var http = require('http').createServer(app);
const webport = process.env.PORT || 8080;
const querystring = require('querystring');

// Setup static file directory
app.use(express.static("static"));

// Setup SQLite3 Database
const __db_file_name = "staggr.db";
const sqlite3 = require('sqlite3').verbose();

console.log("Attempting connection to on-disk database @ " + __dirname + "\\..\\database\\staggr.db");
let db = new sqlite3.Database(__dirname + "\\..\\database\\" + __db_file_name, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the on-disk SQlite database.');
});

// Function to check if row exists by google place ID
function rowExistsByPlaceId(gpi) {
    let __check_if_shop_exists_query = `SELECT * FROM shopping_centers WHERE google_place_id = "${gpi}"`;
    db.get(__check_if_shop_exists_query, (err, row) => {
        if (err) {
            console.error(err);
            return false;
        }
        return row;
    });
}

// Create tables (if not already existing)

// Yes, I could use [IF NOT EXISTS] but the error is useful for console output.
let __create_shopping_centers = `
CREATE TABLE shopping_centers (
    center_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    suburb TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    google_popularity BLOB,
    google_place_id TEXT UNIQUE NOT NULL,
    homemade_poupularity BLOB,
) [WITHOUT ROWID];`;

db.get(__create_shopping_centers, (err, row) => {

    if (err.errno == 1) {
        return console.log("Shopping centers table already exists inside database " + __db_file_name);
    } else if (err) {
        return console.error(err);
    }

    console.log("Created shopping centers table!!");
    console.log(row);

});

// TEST TODO REMOVE
let __test_insert_gpi = `
INSERT INTO shopping_centers (name,suburb,state,country,google_place_id)
VALUES ('Test Mart','Brooklyn','New York','United States of America','hello')
`

db.get(__test_insert_gpi, (err, row) => {
    if (err) return console.error(err);
});

app.get("/api/sc_info_delivery", (req, res) => {

    console.log("New shopping center data input query: " + req.query.google_place_id)
    let row = rowExistsByPlaceId(req.query.google_place_id);

    if (row) {

    } else {

    }

});


process.on("SIGTERM", function () {

    console.log("Recieved SIGTERM signal, will close database connection and exit.");

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Closed the database connection.');
    });

    return 1;
    
})


// Listen for connections
http.listen(webport, function(){
    console.log('listening on *:' + webport);
});