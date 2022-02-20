const router = require('express').Router()
const referral = require('../controllers/referral.controller')

router.get('/:code', referral.list) 

router.post('/', referral.create)

module.exports = router 