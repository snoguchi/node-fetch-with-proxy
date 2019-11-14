# node-fetch-with-proxy

Thin wrapper of [node-fetch](https://www.npmjs.com/package/node-fetch) that can be used behind the proxy.

The proxy specified by the environment variable (HTTP_PROXY, https_proxy, etc.) is used in Node.js environment.

## Install

```sh
$ npm install node-fetch-with-proxy
```

## Usage

See [node-fetch](https://www.npmjs.com/package/node-fetch)

## Advanced Usage

You can explicitly specify proxy options with the 3rd argument of `fetch` API.

```javascript
const proxyUrl = 'http://your.proxy:port';

fetch('https://httpbin.org/post', {
  method: 'POST',
  body: 'foo=bar'
}, proxyUrl);
```
