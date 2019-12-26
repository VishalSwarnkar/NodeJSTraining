const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;


const logger = createLogger({
    format: combine(
      prettyPrint(),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './error.log' , level: 'error'  }),
        new transports.File({ filename: './info.log' , level: 'info'  })
    ]
  });

 module.exports = logger;