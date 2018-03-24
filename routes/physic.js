const express = require('express');
const router = express.Router();
const SerialPort = require('serialport');
const request = require('request');

router.post('/', function(req, res) {

   let name = req.body.name;


   const port = new SerialPort('COM6', {
      baudRate: 9600
   }, (err) =>{
      if(err)
         console.log(err);
   });

      setTimeout(function () {
         port.write("1");
      }, 2000);

   /*port.on('data', function (data) {
      console.log('Data:', data.toString());
      port.close((err) => {
         console.log( 'port closed', err )
      });
   });*/

   port.on('readable', function () {
      console.log('Data:', port.read());
   });



   res.set('Content-Type', 'text/html');
   res.send({result: "12345"});
   port.on('data', (data) => {
      //parameters СПРОСИТЬ!
      let string = '0.' + data.toString();

      //control value
      let ideal = 0.45;

      //max lambda
      let lambda = 0.1; //sprosit'

      let result = false;

      if(Math.abs(ideal - string) <= lambda)
         result = true;

      console.log(result);

      request({
            url: 'http://localhost/physic', //поменять
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