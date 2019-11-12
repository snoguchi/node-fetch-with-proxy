# node-fetch-with-proxy

Thin wrapper of [node-fetch](https://www.npmjs.com/package/node-fetch) that can be used behind the proxy.

In the Node.js environment, the proxy specified by the environment variable (HTTP_PROXY, https_proxy, etc.) is used.

## Install

```sh
$ npm install node-fetch-with-proxy
```

## Usage

See [node-fetch](https://www.npmjs.com/package/node-fetch)

## Advanced Usage

You can specify proxy options in the 3rd argument of `fetch`.

```javascript
const proxyUrl = 'http://your.proxy:port';

fetch('https://httpbin.org/post', {
  method: 'POST',
  body: 'foo=bar'
}, proxyUrl);
```
