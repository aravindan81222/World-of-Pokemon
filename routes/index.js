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


const getDesc = async (url) => {
  try {
    console.log(url)
    const response = await axios.get(url)
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getData = async (url) => {
  try {
    console.log(url)
    const response = await axios.get(url)
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error)
  }
}

router.get('/pokemon', function(req, res, next) {
  let name = req.param('name').split(' ').join('-').toLowerCase();
  console.log(name);
  
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  request(url, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          let result = JSON.parse(response.body);
          let id  = result.id; 
          // result.effect_entries.forEach(element => {
          //   if(element.language['name'] == 'en'){
          //     description = element.effect;
          //     console.log(description.toString());
          //   }
          // });

          const descUrl = `https://pokeapi.co/api/v2/characteristic/${id}`
          getDesc(descUrl)
          .then((data) => {
            let description;
            data.descriptions.forEach(element => {
                if(element.language['name'] == 'en'){
                  description = element.description;
                }
              });
              return description;
          })
          .then( (desc) => {
            const translateUrl = `https://api.funtranslations.com/translate/shakespeare.json?text='${desc}'`;
            return translateUrl;
          })
          .then(getURL => getData(getURL))
          .then((data) => {
            let translatedDesc = data.contents.translated;
            res.json({name: name, description: translatedDesc})
          })
          .catch(err => res.send({success: false, message: 'No Description Found or Exceeded free limit'}));
    });
});


module.exports = router;
