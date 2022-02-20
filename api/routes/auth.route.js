const router = require('express').Router()
const auth = require('../controllers/auth.controller')

router.post('/login', auth.login) 

router.get('/', (req, res) => {
    res.send(req.headers)
})

module.exports = router 