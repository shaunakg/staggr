// Staggr [Node.JS Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

// Include local environment variables
var dotenv = require('dotenv').config({path:__dirname + '/staggr.env', debug: process.env.DEBUG});

// Include web dependencies
var express = require('express');
var app = express();
var http = require('http').createServer(app);
const querystring = require('querystring');

// Setup SQLite3 Database
const sqlite3 = require('sqlite3').verbose();

console.log("Attempting connection to on-disk database @ " + __dirname + "\\..\\database\\staggr.db");
let db = new sqlite3.Database(__dirname + "\\..\\database\\staggr.db", (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the on-disk SQlite database.');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});