// const http = require('http');

// const server = http.createServer((request, response) => {
//   response.setHeader('Content-Type', 'text/html')
//   response.write('<h1>hello there!</h1>');
//   response.end();
// });

// server.listen(3000);

const http = require('http');

const server = http.createServer((request, response) => {

  let body = []
  request.on('data', (chunk) => {
    body.push(chunk)
  })
  request.on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body)
    response.setHeader('Content-Type', 'text/html')
    response.write(
      '<form method="POST" action="/" ><input name="username" type="text"><button type="submit">SEND</button></form>'
    );
    response.end();
  })
  
  
});

server.listen(3000);