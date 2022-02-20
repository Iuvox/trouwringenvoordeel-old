const axios = require('axios').default
const crypto = require('crypto')

const getDate = () => {
    const utc = new Date(Date.now())
    const month = utc.getUTCMonth() + 1    

    return utc.getFullYear() + "-" + 
    month.toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "-" + 
    utc.getUTCDate().toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "T" + 
    utc.getUTCHours() + ":" + 
    utc.getUTCMinutes() + ":" + 
    utc.getUTCSeconds().toLocaleString('nl-NL', {minimumIntegerDigits: 2}) + "+00:00" 

}

const getPath = (req) => {
    return (req.baseURL + req.url).split('trouwringenvoordeel.nl')[1]
}

const getHash = (req, date) => {
    const hashString = [
        process.env.CCV_PUBLIC_KEY,
        req.method.toUpperCase(),
        getPath(req),
        JSON.stringify(req.data),
        date
    ].join('|')

    
    const hash = crypto.createHmac('sha512', process.env.CCV_SECRET_KEY)
    .update(hashString)
    .digest('hex')

    return hash

}


const ccvapi = axios.create({
    baseURL: 'https://www.trouwringenvoordeel.nl/api/rest/v1',
})

ccvapi.interceptors.request.use(req => {
    const date = getDate()
    req.timeout = 3000
    req.headers.common = {
        ...req.headers.common,
        'x-date': date,
        'x-hash': getHash(req, date),
        'x-public': process.env.CCV_PUBLIC_KEY
    }    
    return req
})

module.exports = ccvapi
