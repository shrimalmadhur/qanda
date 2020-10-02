var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE qanda (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question text, 
            answer text
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log("Error creating table")
                console.log(err.message)
            }
        });  
    }
});


module.exports = db