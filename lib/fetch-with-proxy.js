'use strict';

const fetch = require('node-fetch');
const ProxyAgent = require('proxy-agent');

module.exports = (url, options, proxyOptions) => {
  const agent = new ProxyAgent(proxyOptions);
  return fetch(url, { agent, ...options });
};
