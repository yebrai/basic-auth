const isLoggedIn = (req, res, next) => {
    if (req.session.activeUser === undefined) {
        //si no tienes sesion, fuera
        res.redirect("/auth/login")
        //puedes pasar
    } else {
        next()
    }
}

const isAdmin = (req, res ,ext) => {
    if (req.session.activeUser === undefined || req.session.activeUser.role !== "admin") {
        // no tienes permiso    
    } else {
        next()
        //bienvenido admin

    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}