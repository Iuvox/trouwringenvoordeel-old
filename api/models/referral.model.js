const mysql = require('../config/db')

module.exports.findCode = (code, callback = Function) => {
    mysql.query(`SELECT code,order_number,created_at FROM referral WHERE code = '${code}'`, (err, res) => {
        callback(err, res)
        return 
    })
}