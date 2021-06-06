const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema');

// create express app
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema: schema
  }))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
connect();

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Product application."});
});

require('./app/routes/note.routes.js')(app);

// listen for requests
var server= app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

function connect(){
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
      
            mockgoose.prepareStorage()
              .then(() => {
                mongoose.connect(dbConfig.url,
                  { useNewUrlParser: true, useCreateIndex: true })
                  .then((res, err) => {
                   // console.log("Successfully connected to the mock database");  
                    if (err) return reject(err);
                    resolve();
                  })
              })
          } else {
        mongoose.connect(dbConfig.url, {
            useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");  
            resolve();  
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            reject();
            process.exit();
        });
    }
    });
}
function close(){
    return mongoose.disconnect();
}
module.exports = { server,connect, close,  };