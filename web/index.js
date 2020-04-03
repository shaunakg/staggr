// Staggr [Node.JS Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

// Include local environment variables
var dotenv = require('dotenv').config({path:__dirname + 'postgres.env', debug: process.env.DEBUG});

if (process.env.LOCAL_CONN) {
    console.log("Using local connection string: " + process.env.LOCAL_CONN);
} else if (process.env.DATABASE_URL) {
    console.log("Using Heroku-provided DB URL: " + process.env.DATABASE_URL);
} else {
    console.log("Didn't find local connection URL or Heroku DB. Program will most likely fail");
}

// // Include web dependencies
// var express = require('express');
// var app = express();
// var http = require('http').createServer(app);
// const querystring = require('querystring');

// // Include Heroku's Postgres module and setup a database
// const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DATABASE_URL || process.env.LOCAL_CONN,
//     ssl: true,
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });