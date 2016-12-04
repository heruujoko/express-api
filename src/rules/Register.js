module.exports = (app) => {
    /*
     * Your validator
     */
    return {
        name: app.Joi.types.String().required(),
        email: app.Joi.types.String().required(),
        city_id: app.Joi.types.Number().required(),
        password: app.Joi.types.String().required().min(5)
    }
}
