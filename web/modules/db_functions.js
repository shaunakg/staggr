
module.exports.db = []

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

module.exports.insertShoppingRow = function(name, gmapsid, homemade_popularity, google_popularity) {
    let newEntry = {

        id: module.exports.db.length,
        created: Date.now(),
        name: name,
        gmapsid: gmapsid,
        homemade_popularity: homemade_popularity,
        google_popularity: google_popularity

    }
    module.exports.db.push(newEntry);
    return true;
}

module.exports.fetchShoppingRow = function (column, val) {

    let results = [];

    module.exports.db.forEach((i, index) => {
        if (i[column] == val) {
            results.push(i);
        }
    });

    return results;

}

module.exports.updateShoppingData = function (match_column, match_val, new_column, new_val) {

    for (var i in module.exports.db) {

        if (i[match_column] == match_val) {
            i[new_column] = new_val;
        }

        console.log("Updated " + i.gmapsid);

    }

    return true;

}