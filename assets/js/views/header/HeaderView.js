define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'text!templates/header/headerTemplate.html'
], function($, _, Backbone, Bootstrap, headerTemplate){

  var HeaderView = Backbone.View.extend({
    el: $("#_header-view"),
    
    initialize: function() {
      this.render();
    },

    render: function(){
      var compiledTemplate = _.template( headerTemplate, {} );
      this.$el.html(compiledTemplate);

      this.initJs();
    },

    initJs: function(){

      $(function() {
        $(".navbar-expand-toggle").click(function() {
          $(".app-container").toggleClass("expanded");
          return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
        });
        return $(".navbar-right-expand-toggle").click(function() {
          $(".navbar-right").toggleClass("expanded");
          return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
        });
      });

      $(function() {
        return $(".side-menu .nav .dropdown").on('show.bs.collapse', function() {
          return $(".side-menu .nav .dropdown .collapse").collapse('hide');
        });
      });


    }
  });

  return HeaderView;
  
});
