const auth = require('../models/auth.model')
const jwt = require('jsonwebtoken')


module.exports.login = (req, res) => {

    auth.login(req.body, (result, err) => {
        res.send({
            token: result
        })
    })

}

module.exports.isLoggedin = (req, res, next) => {
    if('api-token' in req.headers) {
        if(req.headers['api-token'] ===  process.env.API_TOKEN) {
            next()
            return
        }
    }

    if('authorization' in req.headers) {
        const authorization = req.headers.authorization.split(' ')
        if(authorization[0] !== 'Bearer') {
            res.send({
                error: "NO_BEARER_SUPPLIED"
            })
            return
        }
        try {
            const token = jwt.verify(authorization[1], process.env.SECRET_KEY)
            next()
        } catch (error) {
            res.send({
                error: error
            })
        }
    } else {
        res.send({error: "NOT_ALLOWED"})
    }
}