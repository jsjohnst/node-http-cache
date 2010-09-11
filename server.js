var sys = require('sys'),
eyes = require('eyes'),
http = require('http'),
httpProxy = require('http-proxy'),
httpCache = require('http-cache');

 // create a front-facing http server, this httpServer will be the first thing all incoming requests hit
 http.createServer(function (req, res){
   
   // it's really simple, check if the url is in the cache
   if(httpCache.find(req.url)){
    
     // if it's in the cache, lets grab it!
     var cachedResponse = httpCache.get(req.url);

     // now lets write the cached response!
     res.writeHead(200, cachedResponse.headers);
     res.write(cachedResponse.body);
     res.end();
     
   }
   else{

     // if it's not in the cache, let's put it in the cache and respond!
     var proxy = new httpProxy.HttpProxy(req, res);
     proxy.proxyRequest(9000, 'localhost', req, res);
     proxy.emitter.on('proxy', function(err, body, headers){
       if(err){
         eyes.inspect(err);
       }
       else{
         httpCache.set(req.url, body, headers);
       }
     });

   }
 }).listen(8001);

 http.createServer(function (req, res){
   setTimeout(function(){
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.write('request successfully proxied: ' + req.url +'\n' + JSON.stringify(req.headers, true, 2));
     res.end();
   }, 6000); // this request will take SIX seconds to respond, intentional latency here to test cache
 }).listen(9000);