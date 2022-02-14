const express = require('express')
require('dotenv').config()

const prod = (process.env.NODE_ENV === 'production')

const app = express()
const router = express.Router()
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

// parse requests of content-type - application/json
app.use(express.json());
app.use(require('cors')())


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

router.use('/auth', require('./api/routes/auth.route'))

const protected = require('./api/controllers/auth.controller').isLoggedin

//Everything after this is protected
router.use('/referral', protected ,require('./api/routes/referral.route'))


const port = process.env.PORT || 8080

app.use('/api', router)

if(prod) {
    const path = appDir + '/tools/dist/'
    console.log(path)
    app.use(express.static(path))
    app.get('*', (req, res) => {
        res.sendFile(path + '/index.html')
    })
}

app.listen(port, () => {
    console.log(`listening on :${port}`)
})


