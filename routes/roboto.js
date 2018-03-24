const express = require('express');
const router = express.Router();
const SerialPort = require('serialport');
const request = require('request');


router.post('/:num', function(req, res) {
   let num = req.params.num;
   let name = req.body.name;
   console.log(name);

   const port = new SerialPort('COM6', {
      baudRate: 9600
   }, (err) =>{
      if(err)
         console.log(err);
   });

   setTimeout(function () {
      port.write(num);
   }, 2000);

   port.on('data', (data) => {

      let result = data.toString();

      request({
            url: 'http://localhost/roboto/' + num,
            method: "POST",
            body: {
               result: result,
               name: name
            },
            json: true
         },
         function (error, response, body) {
            console.log('body:', body);
            res.send(body);
         });
   });
});

module.exports = router;