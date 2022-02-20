const router = require('express').Router()
const webhook = require('../controllers/webhook.controller')


router.post('/ccvshop/order', webhook.handleOrder)

router.post('/activecampaign/checkreferral', webhook.checkreferral)

module.exports = router