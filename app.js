var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validUrl = require('valid-url');
var express = require('express');
var urlToShorten = require('./models/urlToShorten');
var app = express();

mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost/urls');

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'html');
app.use(express.static('public'))

app.get('/new/:urlToShorten(*)', function(req, res, next){
   var url =  req.params.urlToShorten;
   var randomNums = Math.floor(Math.random() * (9000 - 1000 + 1) + 1000);
   if (validUrl.is_http_uri(url) || validUrl.is_https_uri(url)){
   
       var data = new urlToShorten({
           original_url: url,
           shortend_url: randomNums
       });
       
       data.save(function(err, data){
          if(err){
              return res.send('ERROR CONNECTING TO DATABAS/COULD NOT SAVE CONNECTION');
          } 
          res.json(data);
       });
} 
else {
      return res.send('Invalid or inproper url format from user input');
}
});


app.get('/newUrl/:convertUrl', function(req, res, next){
    var url = req.params.convertUrl;
    
    urlToShorten.findOne({'shortend_url': url}, function(err, data){
        if(err){
            return res.send('ERROR CONNECTING TO DATABASE');
        }

        res.redirect(301,  data.original_url);
    });
});

app.listen(process.env.PORT || 3000);