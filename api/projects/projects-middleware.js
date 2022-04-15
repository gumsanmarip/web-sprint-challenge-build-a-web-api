// add middlewares here related to projects
const Projects = require('./projects-model.js');

const validateId = (req, res, next) => {
    Projects.get(req.params.id)
    .then(project => {
        if(project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: `invalid id` });
        }
    })
    .catch(next);
}

const checkPayload = (req, res, next) => {
    if(req.body.name && req.body.description) {
        req.body.name = req.body.name.trim();
        req.body.description = req.body.description.trim();
        req.project = req.body;
        next();
    } else {
        res.status(400).json({
            message: 'missing proper name or description'
        });
    }
}

const checkCompletion = (req, res, next) => {
    const { completed } = req.body;
  if(completed !== true && completed !== false) {
        res.status(400).json({
        message: 'completion error'
        });
    } else {
        next();
    }
}

const requiredBody = (req, res, next) =>{
    if(req.body.name && req.body.description) {
        req.project = req.body;
        next();
    } else {
        res.status(400).json({ message: 'request body is required!' });
    }
}

module.exports = {
    validateId,
    checkPayload,
    checkCompletion,
    requiredBody
}
