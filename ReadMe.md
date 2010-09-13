# unreleased, under development 

<img src="http://imgur.com/jsm5Z.gif" border="0"/>

node-http-cache is a dirt simple in-memory cache for http requests. it has an easy to use API that is exposed through CommonJS and JSON-RPC.

#### Author: [Marak Squires](http://github.com/marak/)


# node-http-cache - v0.1.0

### Features

- super fast in-memory http request caching
- can be used as a CommonJS module in node.js
- can be used as a standalone server
- built in JSON-RPC API

### When to use node-http-cache

let's suppose you have a web application that serves http requests, by using http-cache you can seamlessly cache the entire site in one line and drastically increase site performance without making ANY modifications to your existing code base. if you require more fine-tuned control, you can assign caching best on regex routes using http-cache's API (which can be used as a CommonJS module, or as a JSON-RPC web-service)

### Installing npm (node package manager)
<pre>
  curl http://npmjs.org/install.sh | sh
</pre>

### Installing node-http-cache
<pre>
  npm install http-cache
</pre>

### How to setup a basic caching server
<pre>
  var http = require('http'),
      httpCache = require('http-cache');

  // this will start a new front-facing httpServer on port 8000
  httpCache.createServer(9000, 'localhost').listen(8000);

  // the target httpServer (which we will cache) is listening on port 9000
  http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('request successfully cached!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }).listen(9000);
</pre>

See the [demo](http://github.com/nodejitsu/node-http-cache/blob/master/demo.js) for further examples.


### Why doesn't node-http-cache have more advanced features like x, y, or z?

If you have a suggestion for a feature currently not supported, feel free to open a [support issue](http://github.com/nodejitsu/node-http-cache/issues). node-http-cache is designed to just cache http requests from one server to another, but we will be soon releasing many other complimentary projects that can be used in conjunction with node-http-cache.

<br/>
### License

(The MIT License)

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

[0]: http://nodejitsu.com