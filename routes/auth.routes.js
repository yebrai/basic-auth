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

 router.post("/signup", async (req, res, next) => {
    // aqui recibiremos la info del formulario

    const { username, email, password } = req.body

    // 1. Validaciones de backend
    // todos los campos deben de estar llenos
    if (username === "" || email === "" || password === "") {
        res.render("auth/signup.hbs", {
            errorMessage: "Debes llenar todos los campos"
        })
        return; // deten la ejecucion de la ruta
    }
    // validar el username tenga minimo 3 caracteres (Katas if username.length < 3 ...)

    // Ejemplo de usar regex que tenga unas condiciones
    //validar la fuerza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordRegex.test(password) === false ) {
            res.render("auth/signup.hbs", {
                errorMessage: "La contraseña debe tener minimo 8 caracteres, una mayuscula y un numero"
            })
            return; // deten la ejecucion de la ruta
    }
    //EJEMPLO validar el formato del correo electronico
    

    
    try {
        //validacion de que el usuario sea unico, no este registrado en la DB
        const foundUser = await User.findOne({username: username})
        console.log(foundUser)
        if (foundUser !== null) {
            // | si existe en la DB:
            res.render("auth/signup.hbs", {
                errorMessage:"usuario ya creado con ese nombre"
            })
        }
        // EJEMPLO verficar tambien que el correo electronico es unico y no esta registrado en la DB
        

        // 2. Elemento de seguridad
    
        // 3. Crear el perfil del usuario

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        await User.create(newUser)
    
        // para pruebas, para enviar algo al cliente
        res.redirect("/")
        
    } catch (error) {
        next(error)
    }



 })

// GET /auth/login - rengit deriza el form de login

 router.get("/login", (req, res, next) => {
    
    res.render("auth/login.hbs")
 })


// POST /auth/login - guarda la data del form de login

// router.post("/login", (req, res, next) => {
    
// })