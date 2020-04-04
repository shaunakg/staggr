// Staggr [Essential Shopping Center DB Functions]
// Created in 48 hours for the Hack The Crisis Hackathon Australia
// Github: https://github.com/shaunakg/stagger-it
// Hackathon: https://hack-the-crisis-australia.devpost.com/

module.exports.homemadeDataTemplate = {
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

module.exports.initTables = function (__db_file_name) {
    let __create_shopping_centers = `
    CREATE TABLE shopping_centers (
        center_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        google_popularity BLOB,
        google_place_id TEXT UNIQUE NOT NULL,
        homemade_popularity BLOB,
    ) [WITHOUT ROWID];`;

    module.exports.db.get(__create_shopping_centers, (err, row) => {
        if (err.errno == 1) {
            return console.log("Shopping centers table already exists inside database " + __db_file_name);
        } else if (err) {
            return console.error(err);
        }
        return console.log("Created shopping centers table!!");
    });
}

module.exports.fetchShoppingRow = function (match_column, match_val) {
    let __check_if_shop_exists_query = module.exports.db.prepare(`SELECT * FROM shopping_centers WHERE ${match_column} = "${match_val}"`);
    module.exports.db.get(__check_if_shop_exists_query, (err, row) => {
        if (err) {
            console.error(err);
            return false;
        }
        return row;
    });
}

module.exports.insertShoppingRow = function (name, google_popularity, google_place_id, homemade_popularity) {
    let __insert_shopping_center_query = db.prepare(`INSERT INTO shopping_centers (name, google_popularity, google_place_id, homemade_popularity) VALUES (${name},${suburb},${state},${country},${google_popularity},${google_place_id},${homemade_popularity})`);
    module.exports.db.get(__insert_shopping_center_query, (err, row) => {
        if (err) {
            console.error(err);
            return false;
        }
        return row;
    });
}

module.exports.updateShoppingData = function (center_id, column, data) {
    let __update_shopping_center_query = db.prepare(`UPDATE shopping_centers SET ${column}="${data}" WHERE center_id=${center_id}`);
    module.exports.db.get(__update_shopping_center_query, (err, row) => {
        if (err) {
            console.error(err);
            return false;
        }
        return row;
    });
}

module.exports.dbClose = function () {
    module.exports.db.close((err) => {
        if (err) return console.error(err.message);
        console.log('Closed the database connection.');
        return 1;
    });
}

module.exports.Everything = function () {
    let r_val = [];
    module.exports.db.each("SELECT * FROM shopping_centers", function(err, row) {
        r_val.push(row);
    });
    return r_val;
}