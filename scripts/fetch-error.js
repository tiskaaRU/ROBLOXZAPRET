const https = require('https');

https.get('https://robloxzapret-main.vercel.app/api/vote', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log(data));
}).on('error', (err) => console.error(err));
