const axios = require('axios')

const active = axios.create({
    baseURL: 'https://trendytrouwringen.api-us1.com/',
    headers: {
        'Api-Token': process.env.ACTIVECAMPAIGN_API_TOKEN
    }
})

module.exports = active