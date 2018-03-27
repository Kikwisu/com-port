var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var SerialPort = require('serialport');
   var port = new SerialPort('COM3', {
      baudRate: 9600
   });
   var s = "";
   var d = 0;

   port.on('readable', function () {
      if(d < 100){
         s = s + port.read().toString();
         if(s.trim().length !== 3)
            s = "";
         else{
               console.log(s.trim() + " our string ");
         }
         s = "";
         d++;
      }
   });


// Open errors will be emitted as an error event
   port.on('error', function(err) {
      console.log('Error: ', err.message);
   });

   res.render('index');
});

module.exports = router;
