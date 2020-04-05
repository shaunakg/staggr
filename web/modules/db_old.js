// Staggr [Essential Shopping Center DB Functions]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

let fr_val = [];
let r_val = [];

module.exports.dataTemplate = {
    0:{
        0: 0, // Hours 2400 to 0159
        2: 0, // Hours 0200 to 0359
        4: 0, // Hours 0400 to 0559
        6: 0, // Hours 0600 to 0759
        8: 0, // Hours 0800 to 0959
        10: 0, // Hours 1000 to 1159
        12: 0, // Hours 1200 to 1359
        14: 0, // Hours 1400 to 1559
        16: 0, // Hours 1600 to 1759
        18: 0, // Hours 1800 to 1959
        20: 0, // Hours 2000 to 2159
        22: 0, // Hours 2200 to 2359
    },
    1:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    },
    2:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    },
    3:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    },
    4:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    },
    5:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    },
    6:{
        0: 0,
        2: 0,
        4: 0,
        6: 0,
        8: 0,
        10: 0,
        12: 0,
        14: 0,
        16: 0,
        18: 0,
        20: 0,
        22: 0,
    }
}

module.exports.initDb = function (sqlite3, __db_file_name) {
    console.log("Attempting connection to on-disk database @ " + __db_file_name);
    module.exports.db = new sqlite3.Database(__db_file_name, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the on-disk SQlite database.');
    });
}

module.exports.initTables = function () {

    let __create_shopping_centers = `
        CREATE TABLE shopping_centers (
            center_id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            google_popularity BLOB,
            google_place_id TEXT UNIQUE NOT NULL,
            homemade_popularity TEXT
        )
    `;

    module.exports.db.run(__create_shopping_centers, (err) => {
        if (err) {
            return console.error(err);
        }
        return console.log("Created shopping centers table, lastid " + this.lastID);
    });
}

module.exports.fetchShoppingRow = function (match_column, match_val) {

    console.log("running db fetch");

    module.exports.db.serialize( function () {
        let __check_if_shop_exists_query = module.exports.db.prepare('SELECT * FROM shopping_centers WHERE (?) = "(?)"');
        __check_if_shop_exists_query.get([match_column, match_val], (err, row) => {
            if (err) {
                console.error(err);
                fr_val = false;
            }
            fr_val = row;
        });
    });

    return fr_val;

}

module.exports.insertShoppingRow = function (name, google_place_id, google_popularity = null, homemade_popularity = null) {

    google_popularity = google_popularity || null;
    homemade_popularity = homemade_popularity || null;

    console.log("running db insert");

    let __insert_shopping_center_query = module.exports.db.prepare('INSERT INTO shopping_centers (name, google_popularity, google_place_id, homemade_popularity) VALUES ("?","?","?","?")');
    
    __insert_shopping_center_query.get([name, google_popularity, google_place_id, homemade_popularity], (err) => {
        if (err) return console.error("ISR 153 ERROR: ",err);
    });

}

module.exports.updateShoppingData = function (center_id, column, data) {

    console.log("running db update");

    module.exports.db.run('UPDATE shopping_centers SET homemade_popularity = ? WHERE center_id = ?', [column, data, center_id]);


}

module.exports.dbClose = function () {
    module.exports.db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
        return 1;
    });
}

module.exports.Everything = function () {

    console.log("running db select all");

    module.exports.db.serialize(function () {

        module.exports.db.each("SELECT * FROM shopping_centers;", function (err, row) {
            if (err) return console.error(err);
            r_val.push(row);
        });
        
    });

    return r_val;

}