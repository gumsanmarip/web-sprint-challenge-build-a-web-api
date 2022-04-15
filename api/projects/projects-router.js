// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model.js');
const Actions = require('../actions/actions-model.js');
const { validateId, checkPayload, checkCompletion, requiredBody } = require('./projects-middleware.js');

//Get
router.get('/', async (req, res, next) => {
    Projects.get()
    .then(projects =>{
      res.status(200).json(projects);
    })
  });
//Get id 
router.get('/:id', validateId, (req, res, next) => {
    res.json(req.project);
  });
//Post
router.post('/', requiredBody, (req, res, next) => {
    Projects.insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(next);
  });
//Put id
router.put('/:id', validateId, checkCompletion, checkPayload, (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json(project);
      })
      .catch(next);
  });
//Delete id  
router.delete('/:id', validateId, async (req, res, next) => {
    try {
      await Projects.remove(req.params.id);
      res.status(200).json({ message: 'deleted project' });
    } catch(err) {
      next(err);
    }
  });

//Get actions id
router.get('/:id/actions', (req, res, next) => {
  Projects.getProjectActions(req.params.id)
  .then(actions => {
      res.status(200).json(actions)
  })
  .catch(next);
  });

  module.exports = router;  
