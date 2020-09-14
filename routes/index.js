var express = require('express');
var router = express.Router();
var http = require('http');
const axios = require('axios');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Express' });
});


const getData = async (url) => {
  try {
    const response = await axios.get(url)
    const data = response.data
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
}

router.get('/pokemon', function(req, res, next) {
  let name = req.param('name').split(' ').join('-').toLowerCase();
  console.log(name);
  
  const url = `https://pokeapi.co/api/v2/ability/${name}`;
  request(url, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          let result = JSON.parse(response.body);
          let description;
          result.effect_entries.forEach(element => {
            if(element.language['name'] == 'en'){
              description = element.effect;
            }
          });
          const translateUrl = `https://api.funtranslations.com/translate/shakespeare.json?text=${description}`;
          second(translateUrl);      
    });
    var second = function(translateUrl){

      request(translateUrl,function(error, response, data){
          console.log(response.body);
          console.log(name);
          let description = response.body;
          res.send({name: name, description: description});
     });
    }
    
});


module.exports = router;
