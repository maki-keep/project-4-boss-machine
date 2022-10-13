const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabaseById
} = require('../db');

minionsRouter.param('id', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get('/:id', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:id', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.delete('/:id', (req, res, next) => {
  const minionDeleted = deleteFromDatabaseById('minions', req.params.id);
  if (minionDeleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});
