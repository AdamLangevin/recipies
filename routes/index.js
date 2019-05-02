let express     = require('express')
let router      = express.Router();
let path        = require('path');
let http        = require('request')

//The path to the main page being sent to the client.
let client = path.join(__dirname, '..', 'views', 'client.html');

//function to check the routes being sent to the server.
//if the routes, or the URL are bad an error is sent back
router.get('/*', function(req, res, next){
  if(!(req.headers.host === 'localhost')){
    if(process.env.NODE_ENV !== 'development'){
      console.log('Rejected access');
      return res.status(400);
    } else next();
  } else next();
});

//The main routes used by the server to send to the client
router.get('', (req, res, next) => res.sendFile(client))
router.get('/', (req,res,next) => res.sendFile(client))
router.get('/recipes.html', (req,res,next) => res.sendFile(client))
router.get('/recipes?ingredient=', (req,res,next) => {
  let userText = req.query.ingredient;
  console.log(userText);
  if(!userText){
    return res.json({message: 'No ingredients listed'})
  }
  const urlBase = "https://www.food2fork.com/api/search?key=";
  const apiKey = "74066415dbfcd0d478491ab754f430cd";
  let url = urlBase + apiKey + `&q=${userText}`;
  http.get(url, (err,res2,data)=>{
    return res.json(JSON.parse(data));
  })
  //res.sendFile(client);
})
router.get('/index.html', (req,res,next) => res.sendFile(client))

module.exports = router;
