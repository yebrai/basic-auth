const express = require('express');
const router = express.Router();

//aqui van nuestras rutas de perfil (verlo, actualizarlo, ver usuarios, etc)
// GET "/profile" => el usuario puede ver su perfil
router.get("/", (req, res, next) => {
    res.render("profile/my-profile.hbs")
})

module.exports = router;