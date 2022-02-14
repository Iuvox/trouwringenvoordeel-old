const axios = require('axios')
const crypto = require('crypto')

module.exports.findOrder = (req = {method: String, path: String, data:Object}) => {
    
    const utc = new Date(Date.now())
    const month = utc.getUTCMonth() + 1    
    const date = utc.getFullYear() + "-" + month.toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "-" + utc.getUTCDate().toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "T" + utc.getUTCHours() + ":" + utc.getUTCMinutes() + ":" + utc.getUTCSeconds().toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "+00:00" 
    
    const public = process.env.CCV_PUBLIC_KEY
    
    const hashString = [
        public,
        req.method,
        req.path,
        req.data,
        date
    ].join('|')

    const hash = crypto.createHmac('sha512', process.env.CCV_SECRET_KEY)
        .update(hashString)
        .digest('hex')

    const headers = {
        'x-date': date,
        'x-hash': hash,
        'x-public': public
    }

    return axios({
        url: `https://www.trouwringenvoordeel.nl${req.path}`,
        method: req.method,
        data: req.data,
        headers: headers
    })
 
}
