const sqlite3 = require('sqlite3').verbose()
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const roll = 'CREATE TABLE IF NOT EXISTS Roll(id INTEGER PRIMARY KEY AUTOINCREMENT, Row INT)';
const auth_Table = 'CREATE TABLE IF NOT EXISTS auth(Id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT NOT NULL, Password VARCHAR(20) NOT NULL, User_id INT)';
const user = 'CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY AUTOINCREMENT, First_Name TEXT NOT NULL, Middle_Name TEXT NOT NULL, Last_Name TEXT NOT NULL, DOB DATE NOT NULL, Row_Id INT, Photo )';
const parties = 'CREATE TABLE IF NOT EXISTS Paties(id INTEGER PRIMARY KEY AUTOINCREMENT, Party TEXT, Logo BLOB)';
const position = 'CREATE TABLE IF NOT EXISTS Position(id INTEGER PRIMARY KEY AUTOINCREMENT, Position TEXT)';
const candidates = 'CREATE TABLE IF NOT EXISTS Candidates(id INTEGER PRIMARY KEY AUTOINCREMENT, First_Name TEXT, Middle_Name TEXT, Last_Name TEXT NOT NULL, Party_id INT, Position_id INT, Photo BLOB)';
const votes = 'CREATE TABLE IF NOT EXISTS Votes(id INTEGER PRIMARY KEY AUTOINCREMENT, Candidate_id INT, Votes INT)';


const EDATABASE = new sqlite3.Database('./election.db', (err)=>{
    if (err) {
        console.log('error:', err);
    } else {
        console.log('Database is connected');
    }
})

EDATABASE.serialize(()=>{
    EDATABASE.run(roll);
    EDATABASE.run(auth_Table);
    EDATABASE.run(user);
    EDATABASE.run(parties);
    EDATABASE.run(position);
    EDATABASE.run(candidates);
    EDATABASE.run(votes);
});

EDATABASE.close();



app.get('/signup', (req, res)=>{
    res.render('signup')  
})

app.post('/signup', async (req, res)=>{
let {username, password, email} = req.body
console.log(username, password, email);

let result  = DB.run(`INSERT INTO signup(id, username, email, password) VALUES()`);
let tables = DB.run('SELECT * FROM signup');


console.log(result);
})

app.get('/login', (req, res)=>{
    res.render('login')
})


app.post('/login', (req, res)=>{
    const { password, email} = req.body;
    const currentUser = users.find(user=>{return user.email || user.password})
   
    if (currentUser) {
        console.log('yes');
        console.log(currentUser);
    }else {
        console.log('no, credentials do not match');
    }

    //console.log(currentUser);

   //res.redirect('dashboard');
   //console.log('password match, log in successful');

   
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})





 


app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
})