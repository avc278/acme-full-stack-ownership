const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const api = require('./api');

app.use(express.json());

app.use('/api', api)
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use((req, res, next)=> {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});

app.use((err, req, res, next)=> {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});



const port = process.env.PORT;

db.sync()
  .then(()=> {
    app.listen(port, process.env.IP, ()=> {
      console.log(`listening on port ${port}`)
    });
  });