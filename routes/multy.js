const express = require('express');
const router = express.Router();
const request = require('request');
const ping = require('ping');

router.post('/:num', function(req, res) {
   let num = req.params.num;
   let answ = req.body.answ;

   let answers = ['123456', '654321', '111111']
      ,control = answers[num]
      ,result = false;

   if( answ === control )
      result = true;

      request({
            url: 'http://localhost/multy/' + num,
            method: "POST",
            body: {
               result: result,
               name: req.body.name
            },
            json: true
         },
         function (error, response, body) {
            console.log('body:', body);
            res.send(body);

         });
});

module.exports = router;