const sqlite3 = require('sqlite3');

const EDATABASE = new sqlite3.Database('election.db', (err)=>{
    if (err) {
        console.log('Error:', err.message);
    }
    console.log('database is connected');
})

const roles = `CREATE TABLE IF NOT EXISTS roles
(id INTEGER PRIMARY KEY AUTOINCREMENT, role TEXT NOT NULL)`;

const auth_table = `CREATE TABLE IF NOT EXISTS auth(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, 
    user_id INTEGER, FOREIGN KEY (user_id) REFERENCES user (id)
)`;

const user_table = `CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    first_name TEXT NOT NULL, middle_name TEXT, last_name TEXT NOT NULL, DOB DATE NOT NULL, 
    photo BLOB NOT NULL
)`;
const parties = `CREATE TABLE IF NOT EXISTS Parties(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    Party TEXT NOT NULL, Logo BLOB NOT NULL
)`;

const position = `CREATE TABLE IF NOT EXISTS Position(
    id INTEGER PRIMARY KEY AUTOINCREMENT, Position TEXT
)`;

const candidates = `CREATE TABLE IF NOT EXISTS Candidates(
    id INTEGER PRIMARY KEY AUTOINCREMENT, First_Name TEXT, Middle_Name TEXT, Last_Name TEXT NOT NULL, 
    Party_id INTEGER, Position_id INTEGER, Photo BLOB, FOREIGN KEY (party_id) REFERENCES parties(id)
)`;

const votes = `CREATE TABLE IF NOT EXISTS Votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT, Candidate_id INTEGER, user_id INTEGER, Votes INTEGER, FOREIGN KEY (user_id)
    REFERENCES user(id)
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
    // EDATABASE.run('DROP TABLE roles');
});


module.exports = EDATABASE;