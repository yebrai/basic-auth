const express = require('express');
const User = require('../models/User.model');
const router = express.Router();


const {isLoggedIn} = require ("../middlewares/auth.middlewares.js")
//aqui van nuestras rutas de perfil (verlo, actualizarlo, ver usuarios, etc)
// GET "/profile" => el usuario puede ver su perfil
router.get("/", isLoggedIn, (req, res, next) => {

    // EN TODAS LAS RUTAS DE MI SERVIDOR YO VOY A TENER ACCESO A REQ.SESSION.ACTIVEUSER
    console.log("Usuario que hace la solicitud", req.session.activeUser)
    
    User.findById(req.session.activeUser._id)
    .then((response) => {
  
      res.render("profile/my-profile.hbs", {
        userDetails: response
      })
    })
    .catch((err) => {
      next(err)
    })
    
    
    
    
})

module.exports = router;