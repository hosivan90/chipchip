define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/sidebar/sidebarTemplate.html'
], function($, _, Backbone, sidebarTemplate){

    var SidebarView = Backbone.View.extend({
        el: $("#_sidebar-view"),

        initialize: function() {
            this.render();
        },

        render: function(){
            var compiledTemplate = _.template( sidebarTemplate, {} );
            this.$el.html(compiledTemplate);
        }

    });

    return SidebarView;

});
