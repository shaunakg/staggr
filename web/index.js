// Staggr [Node.JS Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

// Include local environment variables
var dotenv = require('dotenv').config({path:__dirname + '/staggr.env', debug: process.env.DEBUG});

// Setup SQLite3 Database
const sqlite3 = require('sqlite3').verbose();
const __db_file_name = __dirname + "\\..\\database\\staggr.db";
var db_functions = require("./modules/db_functions.js");
db_functions.initDb(sqlite3, __db_file_name);
db_functions.initTables();

// Setup web server
const web = require("./modules/web");

process.on("SIGTERM", function () {
    console.log("Recieved SIGTERM signal, will close database connection and exit.");
    db_functions.dbClose();
    return 1;
})