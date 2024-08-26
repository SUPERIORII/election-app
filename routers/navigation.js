const express = require('express');
const route = express.Router();
const session  = require('express-session');
const EDATABASE = require('../database');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');



route.use(session({
    secret: 'superior123',
    resave:false,
    saveUninitialized: false,

}))

const isAuth = (req, res, next)=>{
    if (req.session.isAuth!==0) return next();
    return res.redirect('login')
}


route.get('/dashboard', isAuth, (req, res)=>{
    if(!req.session.user) return  res.redirect('login');
    
    return res.render('dashboard', {user: req.session.user})
    
})

route.post('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if (err) return res.json(err);
        res.redirect('/login')
    })
})





route.get('/login', (req, res) => {
    res.render('login')
})


route.post('/login', (req, res) => {
   
    let result ={};
    const { email, password } = req.body;
    const query = "SELECT * FROM auth JOIN user ON(auth.user_id=user.id) WHERE auth.email=?";

    try {
        EDATABASE.get(query, [email], async(err, loginUser) => {
            if (err) return err.message;
            if (!loginUser) return res.status(409).json('Email do not exist');
    
            if (loginUser !== 0) {
                const comparedPassword = await bcrypt.compare(password, loginUser.password)
                //console.log(comparedPassword);
    
                if (!comparedPassword) return res.status(409).json('passwords do not match');


                if (comparedPassword!==0 || comparedPassword){

                    const base64Img = loginUser.photo.toString('base64');
                    const imgSrc = `data: image/jpeg;base64,${base64Img}`


                    const {password, email, ...data} = loginUser;

                    console.log(data);
                    
                    req.session.isAuth = true;
                    req.session.user = {
                        data,
                        imgSrc
                    };

                    console.log(req.session.user);
                    
                    
                    res.status(200).redirect('dashboard');
                }
            }
        })
        
    } catch (err) {
        console.error(err)
    }



})


module.exports = route;