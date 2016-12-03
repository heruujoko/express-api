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

}

module.exports = UsersController
