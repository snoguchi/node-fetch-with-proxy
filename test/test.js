'use strict';

const fetch = require('../');

fetch('http://httpbin.org/get').then(res => console.assert(res.status === 200));
