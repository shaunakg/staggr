// Staggr [Node.JS Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

// Include local environment variables
var dotenv = require('dotenv').config({path:__dirname + '/staggr.env', debug: process.env.DEBUG});

// Include JSON database
var db_functions = require("./modules/db_functions.js");

db_functions.insertSampleData();

// Setup web server
const web = require("./modules/web");

process.on("SIGTERM", function () {
    console.log("Recieved SIGTERM signal, will close database connection and exit.");
    return 1;
})
