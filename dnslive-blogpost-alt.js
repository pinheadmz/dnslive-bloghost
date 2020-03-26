const fs = require('fs');
const SaltShaker = require("saltshaker-crypto").SaltShaker;

var argv=process.argv;
var argc=argv.length;
function uint8arrayToStringMethod(myUint8Arr){
   return String.fromCharCode.apply(null, myUint8Arr);
}

if(argc != 3 && argc != 4) {
  console.log("Use: node dnslive-alt.js create");
  console.log("Use: node dnslive-alt.js sign file");
  console.log("Use: node dnslive-alt.js get");
}
else {
  if(argc==3) {
    switch(argv[2]) {
      case "create":
        keys = SaltShaker.create();
        if(!fs.existsSync(".saltshaker-public")  && !fs.existsSync(".saltshaker-private")) {
          console.log("Public: "+keys.publickey);
          console.log("Private: "+keys.privatekey);
          fs.writeFileSync(".saltshaker-public",keys.publickey);
          fs.writeFileSync(".saltshaker-private",keys.privatekey);
          console.log(".saltshaker-public and .saltshaker-private written.");
        }
        else {
          console.log(".saltshaker-public or .saltshaker-private files exist already.");
        }
        break;
      case "get":
        if(!fs.existsSync(".saltshaker-public")  && !fs.existsSync(".saltshaker-private")) {
          console.log(".saltshaker-public or .saltshaker-private files do not exist..");
        }
        else {
          console.log("Public: "+fs.readFileSync(".saltshaker-public"));
          console.log("Private: "+fs.readFileSync(".saltshaker-private"));
        }
        break;
      default:
        break;
    }
  }
  else {
    if(argv[2]=="sign") {
      if(!fs.existsSync(argv[3])) {
        console.log(argv[3] + " does not exist.");
      }
      else if(!fs.existsSync(".saltshaker-public") || !fs.existsSync(".saltshaker-private")) {
        console.log(".saltshaker-public or .saltshaker-private files do not exist..");
      }
      else {
        console.log(encodeURI(SaltShaker.sign(uint8arrayToStringMethod(fs.readFileSync(argv[3])),uint8arrayToStringMethod(fs.readFileSync(".saltshaker-private")).trim())));
      }
    }
    else {
      console.log("Use: node dnslive-alt.js create");
      console.log("Use: node dnslive-alt.js sign file");
      console.log("Use: node dnslive-alt.js get");
    }
  }
}
