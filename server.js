const { nameValue, placeValue, birtOfDateValue, addressValue } = require('./module/data.js');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/html');
 res.end(`
  <h1>Biodata!</h1>
   <ul>
    <li>Nama : ${nameValue}</li>
    <li>Tempat Lahir : ${placeValue}</li>
    <li>Tanggal Lahir : ${birtOfDateValue}</li>
    <li>Alamat : ${addressValue}</li>
  </ul>
 `);
});

server.listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});
