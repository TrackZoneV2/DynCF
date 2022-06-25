const phin = require('phin')
const JSONdb = require('simple-json-db');
const db = new JSONdb('storage.json');

const hostname = "DOMAIN" // domain.name
const authToken = "Bearer TCFTOKEN" // Cloudflare token

const cfRequest = async (method, uri, data) => {
  res = await phin({
    method: method,
    url: 'https://api.cloudflare.com/client/v4/' + uri,
    parse: 'json',
    headers:{
      "Authorization": authToken, 
    },
    data: data,
  });

  if (data) {
    return res.body.result
  } else {
    return res.body.result[0]
  }
}

setInterval(async () => {

  hostURI = encodeURI(hostname.split('.').reverse()[1] + '.' + hostname.split('.').reverse()[0])
  getIP = await phin({method: 'GET', parse: 'string', url: 'https://api4.my-ip.io/ip.txt'});

if (db.has('ip') && db.get('ip') == getIP.body) {

    Zone = await cfRequest( 'GET', 'zones?name=' + hostURI, null)
    DNSRec = await cfRequest('GET', 'zones/' + encodeURI(Zone.id) + '/dns_records?name=' + encodeURI(hostname), null)

    // Parms Update DNS
    const data = {
        'type': DNSRec.type,
        'name': DNSRec.name,
        'content': getIP.body,
        'proxied': true,
    }

    finish = await cfRequest('PUT', 'zones/' + encodeURI(Zone.id) + '/dns_records/' + encodeURI(DNSRec.id), data)

}else{
    db.set('ip', getIP.body);
}

}, 900 * 1000); // every 15 minutes