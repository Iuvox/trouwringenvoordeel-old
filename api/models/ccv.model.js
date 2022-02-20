const ccvapi = require('../config/ccvapi')
const logger = require('../config/logging')
const { usedReferral, findusedReferral } = require('./referral.model')

module.exports.findOrder = (orderid) => {
    return ccvapi.get(`/orders/${orderid}`)

}

module.exports.usedCodes = (code = String) => {
    return new Promise( (resolve, reject) => {
        findusedReferral(code).then(referrals => {
            if (referrals.length === 0) {
                return reject('not long enough')
            }
            const orders = []
            for (let i = 0; i < referrals.length; i++) {
                const referral = referrals[i];
                this.findOrder(referral.order_number).then(res => {
                    orders.push(res.data)
                    if (i + 1 === referrals.length) {
                        logger.debug('finished getting all orders')
                        return resolve(orders)
                    }
                }).catch(err => logger.warn(`order number not found: ${referral.order_number}`))
                
            }
        })

    })
}