'use strict';

const chalk = require('chalk');
const path = require('path');
const express = require('express');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const {
  choosePort,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths')

const useNodeBuild = paths.appNodeBuild

const app = useNodeBuild && require(path.join(paths.appNodeBuild, 'index.js')).default

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const isInteractive = process.stdout.isTTY;

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(
    `Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`
  );
  console.log();
}

// We require that you explictly set browsers and do not fall back to
// browserslist defaults.
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);
    const proxySetting = require(paths.appPackageJson).proxy;

    // TODO: use proxy if it exists.
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
    
    const server = express()

    server.use(express.static(paths.appWebBuild, {
      index: useNodeBuild ? false : 'index.html',
    }))

    if (useNodeBuild) {
      server.use(async (request, response, next) => {
        try {
          await app(request, response, next);
        }
        catch (error) {
          next(error);
        }
      });
    }

    server.listen(port, HOST, err => {
      if (err) {
        return console.log(err);
      }
      if (isInteractive) {
        clearConsole();
      }
      console.log(chalk.cyan(`Server listening on port ${port}...\n`));
      openBrowser(urls.localUrlForBrowser);
    });
  })
