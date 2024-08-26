const express = require('express');
const router = express.Router();
const EDATABASE = require('../database');
const multer = require('multer');
const bcrypt = require('bcrypt');

const votersProfile = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./images/registered-voters")
    },
    filename:(req, file, cb)=>{
        cb(null, 'IMG'+Date.now()+file.originalname)
    }
})

const upload = multer({storage:votersProfile});



router.get('/', (req, res)=>{
    res.render('registration')
})


router.post('/', upload.single('file'), async(req, res)=>{
    const {first_name, middle_name, last_name, DOB, email, username, password, role, file} = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    
    const photo = req.file.buffer;
   
    //sql query
    let query = "SELECT * FROM auth WHERE email =?"

    try {
        EDATABASE.get(query, [email], (err, returnUser)=>{
            if(err) return res.status(500).json({error:err.message});
            if(returnUser) return res.status(409).json('Voter already exist');
            if (!returnUser){
                let query = "INSERT INTO user(`first_name`,`middle_name`,`last_name`, `DOB`, `photo`) VALUES(?,?,?,?,?)";
                let newID;

                EDATABASE.run(query, [first_name, middle_name, last_name, DOB, photo], function(err){
                    if(err) return res.status(500).json({error:err.message});

                    let query = "INSERT INTO auth(`username`,`email`,`password`,`user_id`) VALUES(?,?,?,?)"
                    EDATABASE.run(query, [username, email,hashPassword,this.lastID], function(err){
                        if(err) throw err;
                       res.redirect('login')
                    })
                    
                })
                
            }
            
        })
       
    } catch (err) {
        res.status(409).json(err)
    }


    
})



module.exports = router;