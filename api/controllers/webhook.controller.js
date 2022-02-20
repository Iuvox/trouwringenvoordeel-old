const ccvapi = require('../config/ccvapi')
const logger = require('../config/logging')
const { setCode } = require('../models/activecampaign.model')
const { findOrder } = require('../models/ccv.model')
const referral = require('../models/referral.model')

module.exports.handleOrder = async(req, res) => {
    const code = await referral.createCode(req.body).catch(err => {
        logger.warn(`Code couldn't be created. ${JSON.stringify(req.body)}`)
        res.status(502).send({
            error: err
        })
    })
    const order = await ccvapi.get(`/orders/${req.body.id}`).catch(err => { logger.warn(err); res.status(502).end()})

    const codeObj = {
        code: code.code
    }

    if (code === undefined || order === undefined) {
        logger.warn(`Code or Order is undefined. ${JSON.stringify({code: code, order: order})}`)
        res.status(502).end()
        return false
    }

    if(order.data.customer.reference !== '') {
        logger.info(`customer used reference: ${JSON.stringify(order.data.customer.reference)}`)
        codeObj.usedReference = order.data.customer.reference
        referral.usedReferral({order_number: order.data.id, code: code.code}).catch(err => logger.warn(`insert of used referral didn't work: ${JSON.stringify(err)}`))
    }



    logger.debug(JSON.stringify(codeObj))
    setCode('joep@mercesmarketing.nl', codeObj).then(resp => {
        res.send({
            insert: code,
            data: resp.data,
            status: resp.status,
        })
    }).catch((err) => {
        res.status(502).send({
            code: err.code,
        })
    })


}

module.exports.checkreferral = (req, res) => {
    const code = req.body.contact.fields.referral_code

    referral.checkCode(code)
        .then(code => {
            if(code.length > 0) {
                res.send({
                    ...code[0]
                })
            } else {
                throw {
                    code: 'NOT_EXISTS',
                    message: 'Geen referral code bekend'
                }   
            }
        })
        .catch(err => {
            res.send(err)
        })
}