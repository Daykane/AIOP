module.exports = function (config) {
    'use strict';

    config.set({
 
        basePath: '../',
 
        frameworks: ['mocha', 'chai', 'sinon'],

        files: [
            'app/*.js',
            'app/components/**/*.html',
            'app/components/**/*.js',
            'app/services/**/*.js',
            'app/helpers/**/*.js',
            'app/views/**/*.js'
        ],
 
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir : 'reports/coverage'
        },

        preprocessors: {
            'app/app.js': 'coverage',
            'app/components/**/*.js': 'coverage',
            'app/services/**/*.js': 'coverage',
            'app/views/**/*.js': 'coverage',
            'app/components/**/*.html': ['ng-html2js'],
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app/',

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'templates'
        },
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: true,
 
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['PhantomJS']
 
    });
};