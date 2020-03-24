const request = require('request');
const fs = require('fs');

let argv = process.argv;
let argc = process.argv.length;

if(argc != 5) {
  console.log("Syntax error: node dnslive.js <domain> <file> <signature>");
}
else {
  let domain = argv[2];
  let data = Buffer.from(fs.readFileSync(argv[3])).toString('base64');
  let sig = argv[4];

  request.post('https://dns.live/bloghost',{form:{zone: domain, data: data, sig: sig}}, function(err,res,body) {
    if(body.includes('?'))
      console.log("Error occurred: "+body);
    else {
      console.log("Posted");
    }
  });
}
