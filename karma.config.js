// Karma configuration
// Generated on Fri Feb 07 2014 14:05:52 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: ['src/js/graphLib.js'
            ,'src/js/dependencyDetection.js'
			,'test/stubs/*.js'
			,'test/specs/*.spec.js'
        ],

        plugins:[
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-story-reporter",
            "karma-coverage"
        ],

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'story'
        reporters: ['story','coverage'],

        //Preprocessors for code coverage configuration
        preprocessors : { 
            'src/js/*.js' : ['coverage']
        },

        //Coverage Report output an Optional Step
        coverageReporter: {
          type : 'html',
          dir  : 'test/coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        //A list of log appenders to be used. See the documentation for log4js for more information.
        loggers: [{type: 'console'}],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 6000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        //singleRun: true
    });
};
