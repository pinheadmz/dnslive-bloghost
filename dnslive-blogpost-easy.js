const {WalletClient} = require('hs-client');

const request = require('request');
const fs = require('fs');

let argv = process.argv;
let argc = process.argv.length;

(async () => {
  if(argc != 5 && argc != 6) {
    console.log("Syntax error: node dnslive.js <domain> <publichtml/path/to/file> <apikey> <wallet optional default allison>");
  }
  else {
    let wallet='allison';
    let domain = argv[2];
    let data = Buffer.from(fs.readFileSync(argv[3])).toString('base64');

    const walletOptions = {
      network: 'main',
      port: 12039,
      apiKey: argv[4]
    }

    const client = new WalletClient(walletOptions);
    const wclient = client.wallet(wallet);

    if(argc==6)
      wallet=argv[5];

    result = await client.execute('getnameinfo', [ domain ]);
    if(result && result.owner.hash) {
      result = await wclient.getCoin(result.owner.hash, result.owner.index);
      if(result.address) {
        address=result.address
        result = await client.execute('signmessage', [address, data]);

        request.post('https://dns.live/blogpost',{form:{zone: domain, data: data, sig: result}}, function(err,res,body) {
          if(body.includes('?'))
            console.log("Error occurred: "+body);
          else {
            console.log("Blog Posted!");
          }
        });
      }
    }
  }
})();
