module.exports = (app) => {
    return function(req,res,next){
        try{
            let token = req.headers.authorization.split(' ')[req.headers.authorization.split(' ').length-1]
            req.jwtpayload = app.jwt.verify(token,'f9ICFKBHBmlN3Vs4MF27')
            next()
        } catch(err){
            res.json({
                status: "error",
                message: "invalid token"
            })
        }

    }
}
