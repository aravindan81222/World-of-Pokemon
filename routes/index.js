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
    console.log(url)
    const response = await axios.get(url)
    const data = response.data;
    console.log(data);
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
              console.log(description.toString());
            }
          });

          const translateUrl = `https://api.funtranslations.com/translate/shakespeare.json?text=${description}`;
          // const translateUrl = `https://pokeapi.co/api/v2/ability/${name}`;
          getData(translateUrl)
          .then(desc => res.send(desc))
          .catch(err => res.send(err));
          //   request(translateUrl,function(err, resp, body1){
          //       console.log(resp.body);
          //       let desc = resp.body;
          //       res.send({name: name, description: desc});
          //  }); 
    });
});


module.exports = router;
