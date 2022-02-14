const router = require('express').Router()
const referral = require('../controllers/referral.controller')

router.get('/:code', referral.check) 

// console.log( (Math.round(Date.now())).toString(36))

module.exports = router 