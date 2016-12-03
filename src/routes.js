/*
 *  Setup routes
 */

module.exports = (app,passport) => {
    app.post('/login',
      passport.authenticate('local'),
      function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        let token = app.jwt.sign({ email: req.user.email },'f9ICFKBHBmlN3Vs4MF27')
        res.json({
            status: 'success',
            token: token
        })
    });
    app.get('/',app.controllers.SpecController.index);
    app.get('/users',app.middlewares.JWTMiddleware.index,app.controllers.UsersController.index);
    app.get('/token',(req,res) => {
        let token = app.jwt.sign({ name: "Heru" },'f9ICFKBHBmlN3Vs4MF27')
        res.json({
            status: 'success',
            token: token
        })
    })
    app.get('/verify',app.middlewares.JWTMiddleware.index,(req,res) => {
        res.json({
            status: "success",
            payload: req.jwtpayload
        })
    })
}
