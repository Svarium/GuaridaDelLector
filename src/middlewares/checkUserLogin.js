module.exports = (req, res, next) => {
    if(req.session.userLogin){
        next()
    }

    return res.redirect('/user/login')
}


//ESTE MIDDLEWARE VA EN TODAS LAS RUTAS EN DONDE NO QUIERO QUE ACCEDAN USUARIOS QUE NO ESTEN LOGUEADOS!!

