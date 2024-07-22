const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');

const imgUpload = multer({storage:multer.memoryStorage()});

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const roll = 'CREATE TABLE IF NOT EXISTS Roll(id INTEGER PRIMARY KEY AUTOINCREMENT, Row INT)';
const auth_table = 'CREATE TABLE IF NOT EXISTS auth(id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(20) NOT NULL, password VARCHAR NOT NULL, user_id INT, FOREIGN KEY(user_id) REFERENCES user(id))';
const user_table = 'CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, middle_name TEXT NOT NULL, last_name TEXT NOT NULL, DOB DATE NOT NULL, photo BLOB)';
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
    EDATABASE.run('PRAGMA foreign_keys = ON');
    //EDATABASE.run(roll);
    EDATABASE.run(user_table);
    EDATABASE.run(auth_table);
    // EDATABASE.run(parties);
    // EDATABASE.run(position);
    // EDATABASE.run(candidates);
    // EDATABASE.run(votes);

    // EDATABASE.run('DROP TABLE auth');
    // EDATABASE.run('DROP TABLE user');
   

    //console.log(EDATABASE.run('SELECT * FROM user'));
});


app.get('/signup', (req, res)=>{
    res.render('signup')  
})

app.post('/signup', async (req, res)=>{
let {username, email, password} = req.body
console.log(username, email, password);

/*
tryDB.serialize(()=>{
    
    tryDB.run(query, (err)=>{
        if(err) {
            console.log(err.message, err.name);
        }
        console.log('Table is successful created');
    });

    tryDB.run(`INSERT INTO try(username, password, email) VALUES('${username}', '${password}','${email}')`,(err)=>{
        if (err) {
            console.log(err.message);
        } else {
            console.log('values insert successfully');
        }
    });


})
tryDB.close()

*/

})

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', (req, res)=>{
    const {email, password}= req.body; 
 })

app.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})


app.get('/voter-registration', (req,res)=>{
    res.render('voter-registration')
})


app.post('/voter-registration',imgUpload.single('file'), async(req,res)=>{
    let {first_name, middle_name, last_name, DOB, username, password, file} = req.body
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const photo  = req.file.buffer


    EDATABASE.run('INSERT INTO user(first_name, middle_name, last_name, DOB, photo) VALUES(?,?,?,?,?)',[first_name, middle_name, last_name, DOB, photo], (err)=> {
        if (err) {
            console.log(err);
        } else {
            console.log('successful');
        }
    });

    EDATABASE.run('INSERT INTO auth(username, password) VALUES(?,?)', [username, hashedPassword], (err)=>{
        if (err) {
           console.log(err.message); 
        } else {
            console.log('insert into auth table successfully');
        }
    })

    res.redirect('login')

});



app.get('/party-registration', (req, res)=>{
    res.render('party-name');
})
 

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
})