class UsersController {

    constructor(app){
        UsersController.app = app;
    }

    index(req,res){
        UsersController.app.models.User.findAll()
        .then((users) =>{
            res.json(users);
        })
    }

    register(req,res){
        let salt = UsersController.app.bcrypt.genSaltSync(10)
        let hash = UsersController.app.bcrypt.hashSync(req.body.password,salt)
        UsersController.app.models.User.create({
            name: req.body.name,
            password: hash,
            email: req.body.email,
            phone: ""
        }).then((err,user) => {
            res.json({
                status: "success",
                message: "user created"
            })
        }).catch(()=>{
            res.json(400,{
                status: "error",
                message: "err"
            })
        })

    }

}

module.exports = UsersController
