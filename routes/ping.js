const express = require('express');
const router = express.Router();
const request = require('request');
const ping = require('ping');

router.post('/', function(req, res) {
   let host = 'google.com';
   ping.sys.probe(host, isAlive => {
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
            console.log('error:', error);
            console.log('body:', body);
            res.set('Content-Type', 'text/html');
            res.send({result: body});
         });
   });
});

module.exports = router;