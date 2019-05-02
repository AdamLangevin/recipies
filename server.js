require('dotenv').load();

let express       = require('express')
let http          = require('http');
let url           = require('url');
let path          = require('path');
let logger        = require('morgan');
let bodyparser    = require('body-parser');
let http_request  = require('request')


//The path to the router
//let mainRoutes   = require('./routes/index');
//The path to the main page being sent to the client.
let client = path.join(__dirname, 'views', 'client.html');

let app = express();

//Port value, if its different on another system.
let PORT = process.env.PORT || 3000;

//Logger used to capture the routes being passed to the server
app.use(logger('dev'));
app.use(bodyparser.json()); //not to sure if this is needed anymore
app.use(bodyparser.urlencoded({extended: false}));

//The path to the static files the server is hosting
app.use('/views', express.static(path.join(__dirname, 'views')));

//The routes that are handled by this server, the api route
//is only useful when making an api call from the client
//browser.
app.get('', (req, res, next) => res.sendFile(client))
app.get('/', (req,res,next) => res.sendFile(client))
app.get('/recipes.html', (req,res,next) => res.sendFile(client))
app.get('/api', (req,res,next) => {
  let userText = req.query.ingredient;
  console.log(userText);
  if(!userText){
    return res.sendFile(client)
  }
  const urlBase = "https://www.food2fork.com/api/search?key=";
  const apiKey = "74066415dbfcd0d478491ab754f430cd";
  let url = urlBase + apiKey + `&q=${userText}`;
  console.log(url);
  http_request.get(url, (err,res2,data)=>{
    return res.contentType('application/json').json(JSON.parse(data));
  })
})
app.get('/recipes', (req,res,next) => res.sendFile(client))
app.get('/index.html', (req,res,next) => res.sendFile(client))

//Some error checking to ensure a real route is being sent,
//this generates a full error message at the CLI
app.use(function(req, res, next){
  console.log(req.url);
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Basic listen on the port with some error checking to ensure
//proper function.
app.listen(PORT, function(err) {
  if(err) {
    return console.log('Error ', err);
  }
  console.log("Server listening on " + PORT);
  console.log("To test use:");
  console.log("localhost:3000");
  console.log("localhost:3000/");
  console.log("localhost:3000/recipes");
  console.log("localhost:3000/recipes.html");
  console.log("localhost:3000/recipes?ingredient=rice,lemon,chicken (or anyother list of ingredients)");

});

//exporting to be usable by the router.
module.exports = app;
