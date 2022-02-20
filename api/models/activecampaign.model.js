const active = require("../config/activeapi")
const referral = require('./referral.model')

module.exports.setCode = (email, codeObj = {code: String, usedReference: String}) => {
    
    const fieldValues = [
        {
            field: 84,
            value: codeObj.code
        }
    ]
    if('usedReference' in codeObj) {
        fieldValues.push({
            field: 85,
            value: codeObj.usedReference
        })
    }

    return active.post('/api/3/contact/sync', {
        contact: {
            email: email,
            fieldValues: fieldValues
        }
    })
}