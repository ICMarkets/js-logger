const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: combine(
    format((info, opts) => {
      Object.assign(info, {
        app_name: 'monitoring',
        commit: process.env.COMMIT
      })
      return info
    })(),
    timestamp(),
    json(),
  ),
  transports: [new transports.Console()]
});

module.exports = logger


module.exports.setLevel = (level) => {
  logger.configure({ level })
}

module.exports.setAppName = (level) => {
  logger.configure({
    format: format((info, opts) => {
      Object.assign(info, {
        app_name: 'monitoring',
        commit: process.env.COMMIT
      })
      return info
    })(),
  })
}
