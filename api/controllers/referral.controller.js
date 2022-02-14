const referral = require('../models/referral.model')
const ccv = require('../models/ccv.model')

module.exports.check = (req, res) => {
    
    referral.findCode(req.params.code, async (err, result) => {
        const message = {}
        message.code = req.params.code
        if(result.length === 0) {
            message.error = 'NOT_FOUND'
        }
        const order = await ccv.findOrder({
            method: "GET",
            path: `/api/rest/v1/orders/?ordernumber=${result[0].order_number}`,
            data: null
        })
        res.send({
            ...message,
            ...result[0],
            order: order.data.items
        })
    })

}