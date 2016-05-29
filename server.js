const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://star-wars-quotes:starwars@ds019143.mlab.com:19143/star-wars-quotes', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
 db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})
app.use(bodyParser.urlencoded({extended: true}))
// All your handlers here...

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
// Note: __dirname is the path to your current working directory. Try logging it and see what you get!
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
