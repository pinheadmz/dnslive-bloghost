const fs = require('fs');
const argv = process.argv;
const argc = process.argv.length;
if(argc==3) {
  if(fs.existsSync(argv[2])) {
    console.log(Buffer.from(fs.readFileSync(argv[2])).toString('base64'));
  }
}
