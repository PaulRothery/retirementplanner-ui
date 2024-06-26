const PROXY_CONFIG = [
  {
    context: ['/retirementplanner'],
    target: 'http://localhost:8080',
    secure: true,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;