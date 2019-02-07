const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;


function generateFormat(app_name) {
  return combine(
    format((info, opts) => {
      Object.assign(info, {
        app_name,
        commit: process.env.COMMIT
      })
      return info
    })(),
    timestamp(),
    json(),
  )
}

var config = {
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: generateFormat()
  transports: [new transports.Console()]
}

const logger = createLogger(config);

module.exports = logger

module.exports.setLevel = (level) => {
  config.level = level
  logger.configure(config)
}

module.exports.setAppName = (app_name) => {
  config.format = generateFormat(app_name)
  logger.configure(config)
}
