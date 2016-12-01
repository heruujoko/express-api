module.exports = (app) => {
    let ctrl = {}
    ctrl.index = function(req,res) {
        res.json({
            name: "api",
            version: "0.0.1"
        });
    }

    return ctrl
}
