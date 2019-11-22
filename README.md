# node-fetch-with-proxy

Thin wrapper of [node-fetch](https://www.npmjs.com/package/node-fetch) that can be used behind the proxy.

## Install

```sh
npm install node-fetch-with-proxy
```

## Usage

API is the same as `node-fetch`.

```javascript
const fetch = require('node-fetch-with-proxy');

fetch('http://httpbin.org/get')
  .then(res => res.json())
  .then(json => console.log(json));
```

Unlike node-fetch, proxy can be set by environment variable.

```sh
export HTTP_PROXY=http://your.proxy:8888
```

Environment variables are only valid for Node.js.
Note that the browser uses its own proxy settings instead.
