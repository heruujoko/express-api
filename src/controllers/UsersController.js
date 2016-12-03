module.exports = (app) => {
    let ctrl = {}
    ctrl.index = function(req,res) {
        app.models.User.findAll()
        .then((users) =>{
            res.json(users);
        })
    }

    return ctrl
}
