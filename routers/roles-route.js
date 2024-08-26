const express = require('express');
const router = express.Router();
const EDATABASE = require('../database');


// router.get('/', (req, res)=>{
//     res.render()
// })

router.post('/', (req, res)=>{
    const role = req.body.role
    let query = "INSERT INTO roles(role) VALUES(?)";

    EDATABASE.run(query, [role], (err)=>{
        if (err) return res.json({ErroMessage : err.message})
        res.json(`the user selecte ${role} as their choice`)
    })

    
})




module.exports = router