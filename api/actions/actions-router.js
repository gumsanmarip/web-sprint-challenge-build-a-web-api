// Write your "actions" router here!
const express = require('express');
const router = express.Router();

const Actions = require('./actions-model.js');
const { validateId, requiredBody } = require('./actions-middlware');

//Get
router.get('/', async (req, res, next) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
  });
//Get id
router.get('/:id', validateId, (req, res) => {
  res.json(req.action);
});
//Post
router.post('/', requiredBody, (req, res, next) => {
  Actions.insert(req.action)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(next);
});
//Put id
router.put('/:id', validateId, requiredBody, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(next);
});
//Delete id  
router.delete('/:id', validateId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(200).json({ message: 'deleted action' });
  } catch(err) {
    next(err);
  }
});

module.exports = router;