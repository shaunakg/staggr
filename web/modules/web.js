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
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../static/index.html"));
})

app.get("/stylesheet.css", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../static/stylesheet.css"), headers = {
        'Content-Type' : 'text/css'
    });
})

app.get("/api/sc_info_delivery", (req, res) => {

    console.log("New shopping center data input query: " + req.query.google_place_id)
    let row = db_functions.fetchShoppingRow("google_place_id", req.query.google_place_id);
    let row_pop_info = row.homemade_popularity || null;
    let submitted_pop_info = JSON.parse(req.query.homemade_popularity) || null;

    if (row) { // Shopping center exists in our database

        if (submitted_pop_info) { // The user has submitted their own shopping times
            if (row_pop_info) { // There is already some shopping times in the shopping center's row
                row_pop_info[submitted_pop_info]++;
                db_functions.updateShoppingData(row.center_id, "homemade_popularity", row_pop_info);
            } else {
                let newRowHomemadeData = db_functions.homemadeDataTemplate;
                newRowHomemadeData[submitted_pop_info]++;
                db_function.updateShoppingData(
                    row.center_id,
                    "homemade_popularity",
                    JSON.stringify(newRowHomemadeData)
                );
            }
        }

        res.redirect(200, "../../display/?status=200_ok_result_follows&" + querystring.stringify(row));

    } else {
        if (submitted_pop_info) {
            let newRowHomemadeData = db_functions.homemadeDataTemplate;
            newRowHomemadeData[submitted_pop_info]++;
            db_function.insertShoppingRow(
                req.query.scName,
                req.query.gmapsPopularity,
                req.query.gmapsId,
                JSON.stringify(newRowHomemadeData)
            );
        }
        res.redirect(200, "../../?status=200_result_recorded_no_data");
    }

});

app.get("/api/dbdump", (req, res) => {
    res.send(db_functions.Everything().join("\n"));
});

// Listen for connections
http.listen(webport, function(){
    console.log('listening on *:' + webport);
});
