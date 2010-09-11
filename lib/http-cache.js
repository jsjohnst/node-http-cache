var sys = require('sys'),
eyes = require('eyes');

var httpCache = exports,
_cache = {};

exports.find = function( url ){
  if(typeof _cache[ url ] != 'undefined'){
    return true;
  }
  else{
    return false;
  }
};

exports.get = function( url ){
  return _cache[ url ];
};

exports.set = function( url , body ){
  _cache[ url ] = body;
};