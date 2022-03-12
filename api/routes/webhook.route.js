const router = require('express').Router()
const webhook = require('../controllers/webhook.controller')


router.post('/ccvshop/order', webhook.handleOrder)

router.post('/activecampaign/checkreferral', webhook.checkreferral)

const protected = require('../controllers/auth.controller').isLoggedin


router.get('/ccvshop', protected, webhook.getActiveWebhooksCCV)
router.post('/ccvshop',protected, webhook.createWebhookCCV)
router.patch('/ccvshop/:id',protected, webhook.updateWebhookCCV)

module.exports = router