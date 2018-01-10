//tslint:disable
import {Application, Request, Response} from 'express';
import {cpus} from 'os';
import * as puppeteer from 'puppeteer';

export default config => {
  process.env.CHROME_BIN           = puppeteer.executablePath();
  process.env.WEBPACK_COMPILE_MODE = require('./build/util/compile-mode').TEST;

  const reports = ['text-summary'];

  const finalConfig: any = {
    // Base path that will be used to resolve all patterns (eg. files, exclude).
    basePath: './',

    concurrency: cpus().length,

    port: 9876,

    // Frameworks to use.
    // Available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['expressServer', 'jasmine'],

    expressServer: {
      extensions: [
        (app: Application) => {
          const fixture = require('./test-fixtures/server-response.json');

          app.get('/fetch/:user', (req: Request, res: Response) => {
            console.debug(`Received request on ${req.url}`);
            setTimeout(() => {
              console.debug(`Responded to ${req.url}`);
              res.json(fixture);
            }, 200);
          });
        }
      ],
      serverPort: 5000
    },

    // List of files to load in the browser.
    files: [
      'karma-test-entry.ts'
    ],

    // Preprocess matching files before serving them to the browser.
    // Available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'karma-test-entry.ts': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config.js'),

    // Webpack please don't spam the console when running in karma!
    webpackMiddleware: {
      noInfo: true,
      // Use stats to turn off verbose output.
      stats:  {
        chunks: false
      }
    },

    mime: {
      'text/x-typescript': ['ts']
    },

    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports
    },

    // Test results reporter to use.
    // Possible values: 'dots', 'progress'.
    // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],

    // Level of logging
    // Possible values:
    // - config.LOG_DISABLE
    // - config.LOG_ERROR
    // - config.LOG_WARN
    // - config.LOG_INFO
    // - config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    browserConsoleLogOptions: {
      level:    'log',
      terminal: true
    },

    colors: true,

    singleRun: true
  };

  if (!process.env.CI) {
    reports.push('html');

    finalConfig.browsers = ['ChromeHeadless'];
  } else {
    reports.push('lcovonly');

    finalConfig.browsers        = ['ChromeHeadlessTravis'];
    finalConfig.customLaunchers = {
      ChromeHeadlessTravis: {
        base:  'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    };
  }

  config.set(finalConfig);
};
