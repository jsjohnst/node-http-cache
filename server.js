var sys = require('sys'),
eyes = require('eyes'),
http = require('http'),
httpCache = require('./lib/http-cache');

eyes.inspect(httpCache);
 // create a front-facing http server, this httpServer will be the first thing all incoming requests hit
 httpCache.createServer(9000, 'localhost').listen(8000);

 http.createServer(function (req, res){
   setTimeout(function(){
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
     res.end();
   }, 3000); // this request will take SIX seconds to respond, intentional latency here to test cache
 }).listen(9000);