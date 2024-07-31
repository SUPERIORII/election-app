const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const EDATABASE = require('./database.js');

const app = express();
const PORT = 3000;


const imgUpload = multer({storage:multer.memoryStorage()});
let sql;


//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Get routes
app.get('/login', (req, res)=>{
    res.render('login')
})

app.get('/dashboard', (req, res)=>{
    res.render('dashboard')
})

app.get('/voter-registration', (req,res)=>{
    res.render('voter-registration')
})


//post routes
app.post('/voter-registration', imgUpload.single('file'), async(req,res)=>{
    let {first_name, middle_name, last_name, DOB, email, username, password,file} = req.body;

    
    // const photo  = req.file.buffer;

    sql= `SELECT * FROM auth WHERE email = ?`
    const insertUserSql = "INSERT INTO user(`first_name`, `middle_name`, `last_name`, `DOB`) VALUES(?,?,?,?)";
    const insertAuthSql ="INSERT INTO auth(`username`, `email`, `password`) VALUES(?,?,?)";
    
    EDATABASE.serialize(()=>{
        
        EDATABASE.get(sql,[email],async(err, result)=>{
            if(err) return res.status(500).json(err.message);
            if (result) return res.status(409).json("User already exist");
            
            
            
            //inseriting into the user table
            EDATABASE.run(insertUserSql, [first_name, middle_name, last_name, DOB],(err, result)=>{
                if (err) return res.status(500).json(err.message);
                
                if (result) return res.status(200).json('Insert into the user table successfully');       
            })
            
            
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            //hashing the password

            EDATABASE.run(insertAuthSql, [username, email, hashedPassword], (err, result)=>{
                if (err) return res.status(500).json(err.message);
                if (result) return res.status(200).json("Insert into Auth Table Successfully");
                
            })


            res.redirect('login');
        })


    })



});


app.post('/login', (req, res)=>{

    const {email, password}= req.body;
    const query = "SELECT * FROM auth WHERE email =?"
    
    EDATABASE.get(query,[email], async(err, result)=>{

        if (err)return res.status(500).json(err.message);

        if (!result) return res.status(405).json("Email do not exist in our database");

        const comparedPassword = await bcrypt.compare(password, result.password);

        if (!comparedPassword) {
            return res.json("Incorrect password or Email");
        } else {
            res.status(302).redirect('dashboard');
           
        }

    })
    
 })



app.get('/party-registration', (req, res)=>{
    res.render('party-name');
})

app.get('/roles', (req, res)=>{
    let query = `SELECT * FROM Roles`;
    const data = {result:[]};
    
    EDATABASE.all(query,[], (err, rows)=>{
        if(err) err.message;


        rows.forEach(row=>{
            data.result.push(row)
           console.log(row)

        })
        //res.render('roles', {rows});
        res.json(rows)
    })
})

app.post('/roles', async(req, res)=>{
    const {Roles} = req.body;
    let query = `INSERT INTO Roles(Roles) VALUES(?)`;
    
    try {
        EDATABASE.run(query, [Roles], (err)=>{
            if(err) {
                res.status(500).json(err.message);
            }
            res.status(200);
            res.json(`${Roles} is successfully entered the Role table`);
        })
    } catch (err) {
        res.status(400)
        console.log('Please Enter the Role for the user');
    }
    
})


app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
})