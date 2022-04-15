// add middlewares here related to actions
const Actions = require('./actions-model.js');

const validateId = (req, res, next) => {
    Actions.get(req.params.id)
    .then(action => {
        if(action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: `invalid id` });
        }
    })
    .catch(next);
}

const requiredBody = (req, res, next) =>{
    if(req.body.notes && req.body.description) {
        req.action = req.body;
        next();
    } else {
        res.status(400).json({ message: 'request body is required!' });
    }
}

module.exports = {
    validateId,
    requiredBody
}
