const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logsDir = path.join(__dirname, '..', 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const logLine = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), logLine),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logsDir, 'automation.log') }),
  ],
});

module.exports = logger;
