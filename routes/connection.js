const express = require('express');
const router = express.Router();
const request = require('request');
const ping = require('ping');

router.post('/', function(req, res) {

   let host = 'googles.com';
    ping.sys.probe(host, isAlive => {
       if(isAlive)
          res.end("1");
       res.end("0");
       request({
             url: 'http://localhost/net/api',
             method: "POST",
             body: {
                ping: isAlive,
                name: req.body.name
             },
             json: true
         },
          function (error, response, body) {
             console.log('body:', body);
          });
    });
});

module.exports = router;