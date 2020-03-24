# dnslive bloghosting
## Quick and simple client to post on DNS Live's Blog with only your HNS Name as authentication
Simply provide a signature of the file you wish to upload signed by the address associated with your domain/tld.

### Install
```
git clone https://github.com/dnslive/dnslive-bloghost
cd dnslive-bloghost
npm install request hs-client hsd
```
Note: You do not need hsd and hs-client if you are running it manually (not -easy).

### Use
```
node dnslive-bloghost-easy.js domain publichtml/path/to/file apikey wallet(optional)
```
For example, if I have post.txt, with a domain like "mysite" and apikey "asdfasdf"
```
node dnslive-bloghost-easy.js mysite post.txt asdfasdf
```

### Example of full commands to get up and going manually (assumes [Bob Wallet by Kyokan](https://github.com/kyokan/bob-wallet))
1. Copy the address that owns the domain to a temporary textfile/notepad.
2. Get your API key from Bob Wallet  (Settings -> copy HSD API Key to a temporary textfile/notepad)
3. Type this in to select the proper wallet in Bob.
```
./hsw-rpc selectwallet allison --api-key=APIKEY_FROM_HSD
```
4. Type this command and save the signature result -- you'll need it for the final update, it is a signature.
```
./hsw-rpc signmessage ADDRESS_THAT_OWNS_DOMAIN `node /path/to/dnslive-bloghost/dnslive-filetobase64.js file` --api-key=<API KEY from step 2>
```
5. Go to the /path/to/dnslive-bloghost directory
```
node dnslive-bloghost.js <domain> <file> <signature from step 7>
```
6. Done.

### Copyright
Copyright (c) 2020 DNS Live LLC

MIT Licensed.

