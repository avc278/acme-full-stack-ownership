const app = require('express').Router();
const db = require('./db');

app.get('/users', (req, res, next)=> {
    db.readUsers()
      .then( users => res.send(users))
      .catch(next);
  });
  
  app.get('/things', (req, res, next)=> {
    db.readThings()
      .then( things => res.send(things))
      .catch(next);
  });
  
  app.get('/user_things', (req, res, next)=> {
    db.readUserThings()
      .then( userThings => res.send(userThings))
      .catch(next);
  });
  
  app.post('/users', (req, res, next)=> {
    db.createUser(req.body)
      .then( user => res.send(user))
      .catch(next);
  });
  
  app.post('/things', (req, res, next)=> {
    db.createThing(req.body)
      .then( thing => res.send(thing))
      .catch(next);
  });
  
  app.post('/user_things', (req, res, next)=> {
    db.createUserThing(req.body)
      .then( userThing => res.send(userThing))
      .catch(next);
  });
  
  app.delete('/user_things/:id', (req, res, next)=> {
    db.destroyUserThing(req.params.id)
      .then( () => res.sendStatus(204))
      .catch(next);
  });
  
  app.delete('/users/:id', (req, res, next)=> {
    db.destroyUser(req.params.id)
      .then( () => res.sendStatus(204))
      .catch(next);
  });
  
  app.delete('/things/:id', (req, res, next)=> {
    db.destroyThing(req.params.id)
      .then( () => res.sendStatus(204))
      .catch(next);
  });

module.exports = app;