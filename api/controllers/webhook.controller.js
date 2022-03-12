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
        referral.usedReferral({order_number: order.data.id, code: code.code}).catch(err => logger.warn(`insert of used referral didn't work. Probably webhook order is multiple times emitted: ${JSON.stringify(err)}`))
    }



    logger.debug(JSON.stringify(codeObj))

    setCode(req.body.customer_email, codeObj).then(resp => {
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

module.exports.getActiveWebhooksCCV = async (req, res) => {
    const webhooks = await ccvapi.get('/webhooks?size=150')
    logger.debug('Got all webhooks')
    res.send(webhooks.data)
}

module.exports.createWebhookCCV = (req, res) => {
    ccvapi.post('/webhooks', {
        ...req.body,
        is_active: true
    }).then(result => {
        res.send(result)
        logger.debug('Added Webhook')
    }).catch(err => {
        logger.warn('Added Webhook failed')
        res.status(500).send(err.data)
    })
}

module.exports.updateWebhookCCV = (req, res) => {
    ccvapi.patch(`/webhooks/${req.params.id}`, {
        address: req.body.address,
        is_active: req.body.is_active
    }).then(result => {
        res.send(result.data)
        logger.debug('Updated Webhook')
    }).catch(err => {
        logger.warn('Update Webhook failed')
        res.status(500).send(err.data)
    })
}