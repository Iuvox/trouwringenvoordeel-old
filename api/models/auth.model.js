const jwt = require('jsonwebtoken')
const logger = require('../config/logging')

module.exports.login = (auth = { name: String, password: String }, callback) => {

    if (auth.password !== 'test') {
        callback('NOT_CORRECT', true)
        return
    }

    const token = jwt.sign({
            user_id: auth.name
        },
        process.env.SECRET_KEY, {
            expiresIn: '2h'
        }
    )
    const currentTime = new Date()
    
    logger.info(`token issued at ${currentTime.toISOString().toString()}`)
    callback(token)
}

