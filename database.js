const sqlite3 = require('sqlite3');

const EDATABASE = new sqlite3.Database('election.db', (err)=>{
    if (err) {
        console.log('Error:', err.message);
    }
    console.log('database is connected');
})

const roles = `CREATE TABLE IF NOT EXISTS Roles
(id INTEGER PRIMARY KEY AUTOINCREMENT, Roles TEXT NOT NULL)`;

const auth_table = `CREATE TABLE IF NOT EXISTS auth(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username VARCHAR(20) NOT NULL, email VARCHAR(20) NOT NULL, password VARCHAR NOT NULL, 
    user_id INT, FOREIGN KEY (user_id) REFERENCES user(id)
)`;

const user_table = `CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    first_name TEXT NOT NULL, middle_name TEXT NOT NULL, last_name TEXT NOT NULL, DOB DATE NOT NULL, 
    photo BLOB
)`;
const parties = `CREATE TABLE IF NOT EXISTS Paties(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    Party TEXT, Logo BLOB
)`;

const position = `CREATE TABLE IF NOT EXISTS Position(
    id INTEGER PRIMARY KEY AUTOINCREMENT, Position TEXT
)`;

const candidates = `CREATE TABLE IF NOT EXISTS Candidates(
    id INTEGER PRIMARY KEY AUTOINCREMENT, First_Name TEXT, Middle_Name TEXT, Last_Name TEXT NOT NULL, 
    Party_id INT, Position_id INT, Photo BLOB
)`;

const votes = `CREATE TABLE IF NOT EXISTS Votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT, Candidate_id INT, Votes INT
)`;

EDATABASE.serialize(()=>{
    EDATABASE.run('PRAGMA foreign_keys = ON');
    EDATABASE.run(roles);
    EDATABASE.run(auth_table);
    EDATABASE.run(user_table);
    EDATABASE.run(parties);
    EDATABASE.run(position);
    EDATABASE.run(candidates);
    EDATABASE.run(votes);

    // EDATABASE.run('DROP TABLE user');
});


module.exports = EDATABASE;

