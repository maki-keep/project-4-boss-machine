const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabaseById
} = require('../db');

ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.delete('/:id', (req, res, next) => {
  const ideaDeleted = deleteFromDatabaseById('ideas', req.params.id);
  if (ideaDeleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
