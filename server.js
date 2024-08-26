const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const EDATABASE = require('./database.js');
const app = express();
const PORT = 3000;


//imported routes
const navigation = require('./routers/navigation.js');
const loginRoute = require('./routers/login-route.js');
const registrationRoute = require('./routers/registration-route.js')
const rolesRoute = require('./routers/roles-route.js')

const savedImg = multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, "./images")
    },
    filename:(req, file, cb)=>{
        cb(null, "IMG"+ Date.now() + file.originalname)
    }
})

//const imgUpload = multer({storage:multer.memoryStorage()});
const imgUpload = multer({storage:savedImg})

//middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs'); 


//Using routes as middlewares
app.use('/', navigation);
app.use('/registration', registrationRoute);
app.use('/roles', rolesRoute)



app.get('/party-registration', (req, res)=>{
    res.render('party-name');
})

// app.get('/roles', (req, res)=>{
//     let query = `SELECT * FROM Roles`;
//     const data = {result:[]};
    
//     EDATABASE.all(query,[], (err, rows)=>{
//         if(err) return res.status(500).json(err.message);

//         console.log(rows);

//         //res.render('roles', {rows});
//         //res.json(rows)
//     })
// })

// app.post('/roles', async(req, res)=>{
//     const {Roles} = req.body;
//     let query = `INSERT INTO Roles(Roles) VALUES(?)`;
    
//     try {
//         EDATABASE.run(query, [Roles], (err)=>{
//             if(err) {
//                 res.status(500).json(err.message);
//             }
//             res.status(200);
//             res.json(`${Roles} is successfully entered the Role table`);
//         })
//     } catch (err) {
//         res.status(400)
//         console.log('Please Enter the Role for the user');
//     }
    
// })


app.delete('/update/:id', (req, res)=>{
    const deleteSql = `DELETE FROM user WHERE id=?`;

    if(req.body.id === req.params.id) {
        EDATABASE.run(deleteSql, [req.body.id],(err, result)=>{
            if (err) return res.status(500).send('ERROR',err.message)
            res.send(`user has been deleted`)
        })
    } else {
        res.status(400).send(`you can not delete another user info`) 
    }
    

});

app.get('/contestant', (req, res)=>{
    res.render('contestants')
})

app.post('/contestant', imgUpload.single("photo"), (req, res)=>{
    const {photo} = req.body
    const buff= req.file
    console.log(buff)
    console.log('images uploading successfully')

    // console.log(img);
    

})


app.listen(PORT, ()=>{
    console.log(`Server is listening on port: http://localhost:${PORT}`);
})