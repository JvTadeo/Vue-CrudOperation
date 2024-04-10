import sqlite3 from 'sqlite3';

//Define The Path
const dbPath = './Database/sqlite.db'

//Initialize DataBase
const db = new sqlite3.Database(dbPath, err => {
    if(err){
        console.log("Error initializing the database: ", err.message);
    }else{
        console.log("Database initialized successfully!");
    }
});

export default db;