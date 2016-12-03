class JWTMiddleware {
    constructor(app){
        JWTMiddleware.app = app
    }

    index(req,res,next){
        try{
            let token = req.headers.authorization.split(' ')[req.headers.authorization.split(' ').length-1]
            req.jwtpayload = JWTMiddleware.app.jwt.verify(token,'f9ICFKBHBmlN3Vs4MF27')
            next()
        } catch(err){
            res.json({
                status: "error",
                message: err
            })
        }
    }
}

module.exports =  JWTMiddleware;
