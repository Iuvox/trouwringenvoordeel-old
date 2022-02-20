const mysql = require('../config/db')

module.exports.checkCode = (code) => {
    return new Promise((resolve, reject) => {
        mysql.query(`SELECT code,order_number, email, created_at FROM referral WHERE code = '${code}'`, (err, res) => {
            if(err) return reject(err)
            resolve(res)
        })
    })
}
module.exports.findusedReferral = (code) => {
    return new Promise((resolve, reject) => {
        mysql.query(`SELECT order_number FROM usedReferrals WHERE code = '${code}'`, (err, res) => {
            if(err) return reject(err)
            resolve(res)
        })
    })

}

module.exports.createCode = (obj) => {
    const code = (Math.round(Date.now())).toString(36)
    const insert = {
        order_number: obj.ordernumber_full,
        code: code,
        email: obj.customer_email
    }
    return new Promise((resolve, reject) => {
        mysql.query(`INSERT INTO referral SET ?`, insert, (err, res) => {
            if(err && err.code === 'ER_DUP_ENTRY'){
                mysql.query(`SELECT order_number, email,code FROM referral WHERE email = '${insert.email}'`, (err, res) => {
                    if(err) return reject(err)
                    return resolve(res[0])
                })
            } else {
                resolve(insert)
            }
        })
    })

}

module.exports.usedReferral = (obj = {order_number: String, code: String}) => {
    return new Promise((resolve, reject) => {
        mysql.query(`INSERT INTO usedReferrals SET ?`, obj, (err, res) => {
            if(err) return reject(err)
            resolve(res)
        })
    })
}