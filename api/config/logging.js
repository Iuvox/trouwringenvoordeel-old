const winston = require('winston')
const path = require('path')
const { combine, timestamp, label, printf, colorize } = winston.format;

const format = printf( ({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
})

const logger = winston.createLogger({
    format: combine(
        label({label: 'test'}),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        colorize(),
        format
    ),
    level: (process.env.NODE_ENV === 'production') ? 'info' : 'debug',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: path.resolve('./server.log')})
    ]
})


module.exports = logger