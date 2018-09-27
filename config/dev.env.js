'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://119.27.179.175:12004/portal"',
  WS_SERVERURL:'"ws://119.27.179.175:12010"',
  BASE_API: '"/api/v1"'
})
