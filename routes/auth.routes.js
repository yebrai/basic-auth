const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

//aqui van las rutas de authenticacion (singup y login)

module.exports = router;

// GET /auth/singup - renderiza form para crear usuario
router.get("/signup", (req, res, next) => {

    res.render("auth/signup.hbs")
})



// POST /auth/singup - guarda la data del form para crear usuario

 router.post("/signup", (req, res, next) => {
    



    
    // para pruebas, para enviar algo al cliente
    res.redirect("/")

 })

// GET /auth/login - rengit deriza el form de login

 router.get("/login", (req, res, next) => {
    
    res.render("auth/login.hbs")
 })


// POST /auth/login - guarda la data del form de login

// router.post("/login", (req, res, next) => {
    
// })