'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const fetch = require('..');

const TARGET_PORT = 9001;
const TARGET_URL = `http://localhost:${TARGET_PORT}`;
const PROXY_PORT = 9002;
const PROXY_URL = `http://localhost:${PROXY_PORT}`;

describe('node-fetch-with-proxy', () => {
  let targetServer;
  let targetServerHandler;
  let proxyServer;
  let proxyServerHandler;

  beforeEach(() => {
    targetServerHandler = jest.fn((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('okay');
    });
    targetServer = http.createServer(targetServerHandler).listen(TARGET_PORT);
  });

  beforeEach(done => {
    delete process.env.http_proxy;
    const proxy = httpProxy.createProxyServer();
    proxyServerHandler = jest.fn((req, res) => {
      proxy.web(req, res, { target: `http://${req.headers.host}` });
    });
    proxyServer = http.createServer(proxyServerHandler).listen(PROXY_PORT, done);
  });

  afterEach(done => {
    proxyServer.close(done);
  });

  afterEach(done => {
    targetServer.close(done);
  });

  it('should request without proxy', async () => {
    const res = await fetch(TARGET_URL);
    expect(res.status).toBe(200);
    expect(proxyServerHandler).not.toHaveBeenCalled();
    expect(targetServerHandler).toHaveBeenCalledTimes(1);
  });

  it('should request via proxy specified by argument', async () => {
    const res = await fetch(TARGET_URL, null, PROXY_URL);
    expect(res.status).toBe(200);
    expect(proxyServerHandler).toHaveBeenCalledTimes(1);
    expect(targetServerHandler).toHaveBeenCalledTimes(1);
  });

  it('should request via proxy specified by environment variable', async () => {
    process.env.http_proxy = PROXY_URL;
    const res = await fetch(TARGET_URL);
    expect(res.status).toBe(200);
    expect(proxyServerHandler).toHaveBeenCalledTimes(1);
    expect(targetServerHandler).toHaveBeenCalledTimes(1);
  });

  it('shold fail with invalid proxy', async () => {
    await expect(fetch(TARGET_URL, null, 'http://localhost:9999')).rejects.toThrow();
    expect(proxyServerHandler).not.toHaveBeenCalled();
    expect(targetServerHandler).not.toHaveBeenCalled();
  });
});
