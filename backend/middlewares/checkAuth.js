let checkAuth = (req, res, next) => {
    if(req.session.id) {
        return next();
    } else {
        res.status(401).json({
            mensaje:'Acceso no autorizado.'
        })
    }
}

module.exports ={
    checkAuth
}