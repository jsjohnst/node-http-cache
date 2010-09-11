var sys = require('sys'),
eyes = require('eyes'),
http = require('http'),
httpProxy = require('http-proxy');

var httpCache = exports,
_cache = {};

exports.createServer = function () {
   var args, callback, port, host;
   args = Array.prototype.slice.call(arguments);
   callback = typeof args[args.length - 1] === 'function' && args.pop();
   if (args[0]) port = args[0];
   if (args[1]) host = args[1];

   var server = http.createServer(function (req, res){
     // check if the url is in the cache
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
       var proxy = new HttpCache.HttpCache(req, res);
       proxy.proxyRequest(port, host, req, res);
       proxy.emitter.on('proxy', function(err, body, headers){
         if(err){
           eyes.inspect(err);
         }
         else{
           httpCache.set(req.url, body, headers);
         }
       });

     }
   });
   
   return server;
 };

 

exports.find = function( url ){
  if(typeof _cache[ url ] != 'undefined'){
    sys.puts('found ', url);
    return true;
  }
  else{
    sys.puts('didnt find ', url);
    return false;
  }
};

exports.get = function( url ){
  return _cache[ url ];
};

exports.set = function( url , body, headers ){
  _cache[ url ] = {
    "body": body,
    "headers": headers
  };
};

// TODO: implement
exports.invalidate = function( url ){
  delete _cache[ url ];
};

// TODO: implement 
exports.createServer = function(){
  
};



var HttpCache = function (req, res) {
  this.emitter = new(events.EventEmitter);
  this.events = {};
  this.req = req;
  this.res = res;
};

HttpCache.prototype = {
};

exports.HttpCache = HttpCache;