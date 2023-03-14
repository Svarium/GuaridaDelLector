module.exports = (req, res, next) => {
    if(!req.session.userLogin){
        return res.render('login')
    }

  next()
} 