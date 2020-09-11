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
  let name = req.param('name');
  console.log(name);

  const url = `https://api.funtranslations.com/translate/shakespeare.json?text=${name}`;
  // getData(url);
  request(url, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          res.send(body)
          // let result = body.contents.translated; 
          // return res.status(200).json({name: name, description: result});
    });
  // var request = http.get(`https://api.funtranslations.com/translate/shakespeare.json?text=${name}`, function( req, res, next){
  //   console.log(res);
  // })
  // return res.status(200).json({name: name, description: name});
});

// function getTranslate(name, next){
//   router.get(`https://api.funtranslations.com/translate/shakespeare.json?text=${name}`, function(req, res, next) {
//     let result = res.contents.translated;
//     return res.status(200).json({name: name, description: result});
//   });

// }

module.exports = router;
