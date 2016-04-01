// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        bootstrap: 'libs/bootstrap/bootstrap.min',
        scrolltofixed: 'plugins/jquery-scrolltofixed',
        nprogress: 'plugins/nprogress',
        notify: 'plugins/notify.min',
        helper: 'helper',
        templates: '../templates'
    },

    shim: {
        "jqueryui": ["jquery"],
        "bootstrap": ["jquery"],
        "scrolltofixed": ["jquery"],
        "notify": ["jquery", "bootstrap"],
        "nprogress": {
            'deps': ['jquery'],
            'exports': 'NProgress'
        }
    }
});

require([
    // Load our app module and pass it to our definition function
    'jquery',
    'underscore',
    'backbone',
    'app'

], function ($, _, Backbone, App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});

