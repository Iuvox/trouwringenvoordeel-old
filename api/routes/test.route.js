const logger = require('../config/logging')

const router = require('express').Router()

router.get('/', (req, res) => {
    logger.info('hi')
    res.send(req.headers)
})

module.exports = router