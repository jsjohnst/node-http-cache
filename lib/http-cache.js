var sys = require('sys'),
eyes = require('eyes');

var httpCache = exports,
_cache = {};

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