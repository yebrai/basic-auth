const express = require('express');
const router = express.Router();
const User = require("../models/User.model")
const bcrypt = require('bcryptjs');

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
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)


        // 3. Crear el perfil del usuario

        const newUser = {
            username: username,
            email: email,
            password: hashPassword
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

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body
    console.log(req.body)
    
    // 1. Validacion de backend
    if (email === "" || password === "") {
        res.render("auth/login.hbs", {
            errorMessage:"usuario ya creado con ese nombre"
        })
        return;
    }

    // verificar que el usuario exista

    // EJEMPLO dos campos de contraseña, verificar que sean igual. if (password1 !== password2)
    
    try {
        const foundUser = await User.findOne({email: email})
        if (foundUser === null) {
            //Si no existe
            res.render("auth/login.hbs", {
                errorMessage:"correo electronico o contraseña incorrecta"
            })
            return;
        }
        // 2. verificar la contraseña del usuario (validar)
        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        console.log("isPasswordValid", isPasswordValid)
        if (isPasswordValid === false) {
            res.render("auth/login.hbs", {
                errorMessage:"correo electronico o contraseña incorrecta"
            })
            return;
        }
        // a partir de este punto el usuario estaria validado
        
        // 3. implementar sistema de sesiones y abrir una sesion para este
        
        // que el usuario solo puede entrar a profile si tiene o ha iniciado sesion
        //nos da el id del usuario activo para funcionalidades
        // nos ayuda a tener enlaces especificos si el usuario esta logeado o no

        // express-sesion crea la sesion y envia el cokie (copia de la sesion)
        //connect-mongo se usa para guardar la sesion activa en la DB
       
        // ahora que esta configurado, en este punto vamos a crear una sesion activa de este usuario

        req.session.activeUser = foundUser;// ESTA ES LA LINEA QUE CREA LA SESION/COOKIE

        // el metodo es para asegurar que la sesion se ha creado correctamente antes de continuar
        req.session.save(() => {
            // 4. redireccionar a una pagina privada
            res.redirect("/profile")

        })

        
    } catch (error) {
        next(error)
    }

})

// GET "/auth/logout" => cerrar la sesion (destruirla)

router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})