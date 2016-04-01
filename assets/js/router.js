// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'helper',
    'views/home/HomeView',
    'views/header/HeaderView',
    'views/sidebar/SidebarView',
    'views/footer/FooterView',
    'views/group/PostGroupView'
], function ($, _, Backbone, Bootstrap, Helper, HomeView, HeaderView, SidebarView, FooterView, PostGroup) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'dang-nhom': 'postGroup',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;

        var headerView = new HeaderView();

        var sidebarView = new SidebarView();

        app_router.on('route:postGroup', function (actions) {
            var postGroup = new PostGroup();
            postGroup.render();
        });

        app_router.on('route:defaultAction', function (actions) {
            var homeView = new HomeView();
            homeView.render();
        });

        var footerView = new FooterView();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
