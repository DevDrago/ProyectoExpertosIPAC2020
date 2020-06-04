let checkAuth = (req, res, next) => {
    //console.log('check_auth', req);
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