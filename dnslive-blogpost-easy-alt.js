const request = require('request');
const fs = require('fs');
const SaltShaker = require("saltshaker-crypto").SaltShaker;

var argv=process.argv;
var argc=argv.length;
function uint8arrayToStringMethod(myUint8Arr){
   return String.fromCharCode.apply(null, myUint8Arr);
}

if(argc != 4) {
  console.log("Use: node dnslive-blogpost-easy-alt.js domain file");
}
else {
  if(!fs.existsSync(argv[3])) {
    console.log(argv[3] + " does not exist.");
  }
  else if(!fs.existsSync(".saltshaker-public") || !fs.existsSync(".saltshaker-private")) {
    console.log(".saltshaker-public or .saltshaker-private files do not exist..");
  }
  else {
    let sig=encodeURI(SaltShaker.sign(uint8arrayToStringMethod(fs.readFileSync(argv[3])),uint8arrayToStringMethod(fs.readFileSync(".saltshaker-private")).trim()));
    let domain = argv[2];
    let data = Buffer.from(fs.readFileSync(argv[3])).toString('base64');

    request.post('https://dns.live/blogpost',{form:{zone: domain, data: data, sig: sig}}, function(err,res,body) {
      if(body.includes('?'))
        console.log("Error occurred: "+body);
      else {
        console.log("Posted");
      }
    });
  }
}
