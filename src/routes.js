/*
 *  Setup routes
 */

module.exports = (app) => {
    app.get('/',app.controllers.SpecController.index);
    app.get('/token',(req,res) => {
        let token = app.jwt.sign({ name: "Heru" },'f9ICFKBHBmlN3Vs4MF27')
        res.json({
            status: 'success',
            token: token
        })
    })
    app.get('/verify',app.middlewares.JWTMiddleware,(req,res) => {
        res.json({
            status: "success",
            payload: req.jwtpayload
        })
    })
    app.post('/',(req,res) => {
        res.json(req.body)
    })
}
