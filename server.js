const express = require('express')
require('dotenv').config()

const prod = (process.env.NODE_ENV === 'production')

const app = express()
const router = express.Router()
const { resolve } = require('path');
const logger = require('./api/config/logging')


// parse requests of content-type - application/json
app.use(express.json());
app.use(require('cors')())


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.use('/auth', require('./api/routes/auth.route'))

router.use('/webhook', require('./api/routes/webhook.route'))

router.use('/test', require('./api/routes/test.route'))

//Everything after this is protected
const protected = require('./api/controllers/auth.controller').isLoggedin

router.use('*', protected)


router.use('/referral' , require('./api/routes/referral.route'))


const port = process.env.PORT || 8080

app.use('/api', router)



if(prod) {
    const toolsDir = resolve('./tools/dist')
    
    app.use(express.static(toolsDir))
    app.get('*', (req, res) => {
        res.sendFile(toolsDir + '/index.html')
    })
}

app.listen(port, () => {
    logger.info(`Server started on ${port}`)
})


