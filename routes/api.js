const express = require('express');
const router = express.Router();
const SerialPort = require('serialport');
const request = require('request');

router.post('/', function(req, res) {
   const com_port = new SerialPort('COM6', {
      baudRate: 9600
   }, (err) =>{
      setTimeout(function () {
         com_port.write("1");
      }, 2000);
   });

    /*com_port.open(function(err) {
       if (err) {
          return console.log('Error opening port: ', err.message);
       }
       setTimeout(function () {
          com_port.write("1");
       }, 2000);
    });*/

   com_port.on('error', (err) =>{
      console.log(err);
   });
   com_port.on('data', (data) => {
      console.log(data.toString());
   });

   com_port.on('readable', function () {
      console.log('Data:', com_port.read().toString());
   });

    /*com_port.on('data', function (data) {
       console.log('Data:', data);
       // request.post(
       //    'http://www.yoursite.com/formpage',
       //    { json: { user: req.session.user.login } },
       //    function (error, response, body) {
       //       if (!error && response.statusCode === 200) {
       //          console.log(body)
       //       }
       //    }
       // );
       // res.send(data);
    });*/
});

module.exports = router;