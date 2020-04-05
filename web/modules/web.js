// Staggr [Essential Web Server Controller]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

// Include dependencies
let express = require('express');
let app = express();
let http = require('http').createServer(app);
let db_functions = require("./db_functions");
const webport = process.env.PORT || 8080;
const querystring = require('querystring');
const path = require('path');

// Setup static file directory
app.use(express.static("/../static"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../static/index.html"));
})

app.get("/stylesheet.css", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../static/stylesheet.css"), headers = {
        'Content-Type' : 'text/css'
    });
})

app.get("/libs/node_vibrant.js", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../../node_modules/node-vibrant/dist/vibrant.min.js"))
});

app.get("/api/sc_info_delivery", (req, res) => {

    // Takes GET query arguments:
    // scName = String (required)
    // gmapsPopularity = String
    // gmapsId = String (required)
    // homemade_popularity = Array (required, format: [day, time])

    console.log("New shopping center data input query: " + req.query.gmapsId)
    let row = db_functions.fetchShoppingRow("gmapsid", req.query.gmapsId)[0];
    console.log(row);
    let submitted_pop_info = [req.query.day, req.query.time] || null;

    if (row) { // Shopping center exists in our database

        let row_pop_info = row.homemade_popularity || null;

        if (submitted_pop_info) { // The user has submitted their own shopping times
            if (row_pop_info) { // There is already some shopping times in the shopping center's row
                row_pop_info[submitted_pop_info[0]][submitted_pop_info[1]]++;
                db_functions.updateShoppingData(row.center_id, "homemade_popularity", row_pop_info);
            } else {
                let newRowHomemadeData = db_functions.dataTemplate;
                newRowHomemadeData[submitted_pop_info[0]][submitted_pop_info[1]]++;
                db_functions.updateShoppingData(
                    "id",
                    row.id,
                    "homemade_popularity",
                    Buffer.from(JSON.stringify(newRowHomemadeData)).toString("base64")
                );
            }
        }

        res.redirect(301, "../../display/?status=200_ok_result_follows&" + querystring.stringify(row));

    } else {

        console.log("GMID does not exist within current database! Creating...");

        if (submitted_pop_info) { // Create a new row with shopping center data

            let newRowHomemadeData = db_functions.dataTemplate;
            newRowHomemadeData[submitted_pop_info[0]][submitted_pop_info[1]]++;
            db_functions.insertShoppingRow(
                req.query.scName,
                req.query.gmapsId,
                Buffer.from(JSON.stringify(newRowHomemadeData)).toString("base64"),
                req.query.gmapsPopularity
            );

            console.log("Created for " + req.query.gmapsId);

        } else { // Create a new row with blank shopping center data

            let newRowHomemadeData = db_functions.dataTemplate;
            db_functions.insertShoppingRow(
                req.query.scName,
                req.query.gmapsId,
                Buffer.from(JSON.stringify(newRowHomemadeData)).toString("base64"),
                req.query.gmapsPopularity
            );

        }

        res.redirect(301, "../../?status=200_result_recorded_first_data");
    }
});

app.get("/api/dbdump", (req, res) => {

    let r_val = db_functions.db;
    let page = [];

    for (i = 0; i < r_val.length; i++) {
        for (var k in r_val[i]) {
            page.push(k + ": " + r_val[i][k]);
        }
        page.push("---")
    }

    res.end(page.join("\n"));

});

app.get("/api/test1", (req, res) => {
    db_functions.insertShoppingRow("TestMart", "__TEST_" + Date.now(), "GPOPT", Buffer.from(JSON.stringify(db_functions.dataTemplate)).toString("base64"));
    res.redirect("dbdump");
})

// Listen for connections
http.listen(webport, function(){
    console.log('listening on *:' + webport);
});
