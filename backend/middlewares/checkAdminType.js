let checkAdminType = (req, res, next) => {
    //console.log('check_type', req.sessionStore.sessions);
    let tipo = '';
    for(key in req.sessionStore.sessions) {
        let value = req.sessionStore.sessions[key];
        let obj = JSON.parse(value);
        console.log(obj['tipoUsuario']);
        tipo = obj['tipoUsuario'];
    }
    req.session.tipoUsuario = tipo;

    if(req.session.tipoUsuario == 1) {
        return next();
    } else {
        res.status(401).json({
            mensaje:'Acceso no autorizado.'  
        })
    }
}

module.exports ={
    checkAdminType
}