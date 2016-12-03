class SpecController {
    constructor(app){
        SpecController.app = app
    }

    index(req,res){
        res.json({
            name: "api",
            version: "0.0.1"
        });
    }
}

module.exports = SpecController
