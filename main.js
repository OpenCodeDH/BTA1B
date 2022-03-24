var http = require('http');
var fs = require('fs');
var server = http.createServer(function(request, response){
  if(request.url == '/index.html'){
    response.writrHead(200, {
      'Context-type' : 'text/html'
    })

    fs.createReadStream('./index.html').pipe(response);
  }else if(request.url == '/new_demo'){
    request.on('data', function(chunk){
      let data = '' + chunk
      console.log(JSON.parse('{"' + decodeURI(data).replace(/"/g, '","').replace()));
      var user = fs.readFileSync('user.txt');
      console.log(JSON.parse(user.toString()));    });

    response.end();
  }else{

  response.writeHead(404, {
    'context-type' : 'text/plain'
  })
  response.write('404 not found' + request.url);
  response.end();
  }
})
