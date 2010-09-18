/*
  node-http-cache.js: http cache for node.js

  Copyright (c) 2010 Marak Squires

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/


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
       var proxy = new httpProxy.HttpProxy(req, res);
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


var HttpCache = function (req, res) {
  this.emitter = new(events.EventEmitter);
  this.events = {};
  this.req = req;
  this.res = res;
};

HttpCache.prototype = {
};

exports.HttpCache = HttpCache;