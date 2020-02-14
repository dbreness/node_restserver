require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


app.get('/usuario', function (req, res) {
    res.json('get World')
  });

app.post('/usuario', function (req, res) {
    
    let body = req.body;

    res.json(body);
});

app.put('/usuario/:userId', function (req, res) {

    let id = req.params.userId;

    res.json({id});
});

app.delete('/usuario', function (req, res) {
    res.json('delete World')
});


  app.listen(process.env.PORT, () => {
      console.log("escuchando puerto: ", 3000);

  });