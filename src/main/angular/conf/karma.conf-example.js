module.exports = function (config) {
    'use strict';

    config.set({
 
        basePath: '../',
 
        frameworks: ['mocha', 'chai', 'sinon'],

        files: [
            'app/vendors/bower/angular/angular.js',
            'app/vendors/bower/angular-animate/angular-animate.js',
            'app/vendors/bower/angular-mocks/angular-mocks.js',
            'app/vendors/bower/angular-touch/angular-touch.js',
            'app/vendors/bower/angular-ui-router/release/angular-ui-router.js',
            'app/vendors/bower/lodash/dist/lodash.compat.js',
            'app/vendors/bower/angular-cookie/angular-cookie.js',
            'app/vendors/bower/restangular/dist/restangular.js',
            'app/vendors/bower/fastclick/lib/fastclick.js',
            'app/vendors/bower/elasticsearch/elasticsearch.angular.js',
            'app/vendors/bower/angular-sha1/sha1.js',
            'app/vendors/bower/angular-infinite-scroll/src/infinite-scroll.js',
            'app/vendors/bower/angular-hotkeys/build/hotkeys.min.js',
            'app/vendors/bower/angular-scroll/angular-scroll.js',
            'app/vendors/bower/moment/moment.js',
            'app/vendors/bower/angular-moment/angular-moment.js',
            'app/vendors/bower/angular-xeditable/dist/js/xeditable.js',
            'app/vendors/bower/jquery/dist/jquery.min.js',
            'app/vendors/bower/typeahead.js/dist/typeahead.bundle.js',
            'app/vendors/bower/angular-typeahead/angular-typeahead.js',
            'app/vendors/bower/angular-uuid-service/angular-uuid-service.js',
            'app/vendors/bower/ng-html-compile/src/ngHtmlCompile.js',
            'app/vendors/bower/d3/d3.js',
            'app/vendors/bower/angular-intercom/angular-intercom.js',
            'app/vendors/bower/angular-mixpanel/src/angular-mixpanel.js',
            'app/vendors/bower/mixpanel/mixpanel-jslib-snippet.min.js',
            'app/vendors/bower/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js',
            'conf/test-mocks.js',
            'app/*.js',
            'app/components/**/*.html',
            'app/components/**/*.js',
            'app/directives/**/*.html',
            'app/directives/**/*.js',
            'app/domain/**/*.js',
            'app/filters/**/*.js',
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
            'app/directives/**/*.js': 'coverage',
            'app/domain/**/*.js': 'coverage',
            'app/filters/**/*.js': 'coverage',
            'app/services/**/*.js': 'coverage',
            'app/views/**/*.js': 'coverage',
            'app/components/**/*.html': ['ng-html2js'],
            'app/directives/**/*.html': ['ng-html2js']
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