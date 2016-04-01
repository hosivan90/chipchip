define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({

    render: function(){

      var compiledTemplate = _.template( homeTemplate, {} );
      this.$el.html(compiledTemplate);

      $("#_content-view").html(this.$el);
 
    }

  });

  return HomeView;
  
});
