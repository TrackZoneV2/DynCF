# DynCF
Your website at home and protect by cloudflare

### Dependencies NPM :
 * [phin](https://www.npmjs.com/package/phin "lien")
 * [simple-json-db](https://www.npmjs.com/package/simple-json-db "lien")
 * [pm2](https://pm2.keymetrics.io "lien")
 
### Configuration 
For the key api cloudflare, the latter must have the right to the DNS.
```js
const hostname = "DOMAIN" // domain.name
const authToken = "Bearer TCFTOKEN" // Cloudflare token
```
### Deploy the program
`pm2 start index.js`

### Authors
@TrackZoneV2
@Ralex91
