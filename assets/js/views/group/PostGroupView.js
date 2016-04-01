define([
    'jquery',
    'underscore',
    'backbone',
    'scrolltofixed',
    'notify',
    'text!templates/group/postGroupTemplate.html',
    'text!templates/group/itemGroupTemplate.html',
    'text!templates/group/itemMemberTemplate.html'
], function ($, _, Backbone, Scrolltofixed, Notify, postGroupTemplate, itemGroupTemplate, itemMemberTemplate) {

    var localEvent = {};
    _.extend(localEvent, Backbone.Events);

    var ItemMemberView = Backbone.View.extend({
        tagName: "tr",
        className: "_item-member-view",

        initialize: function(){
            this.render();
        },

        render: function () {
            this.$el.html(_.template(itemMemberTemplate, this.model.toJSON()));
            return this;
        },

        events: {

        }

    });

    var ItemGroupView = Backbone.View.extend({
        tagName: "div",
        className: "form-group _item-group-view",
        
        initialize: function(){
            this.render();
        },

        render: function () {
            this.$el.html(_.template(itemGroupTemplate, {}));
            return this;
        },

        events: {
            'click ._clear-item-group': 'clearItemGroup'
        },

        clearItemGroup: function(){
            this.$el.remove();
            localEvent.trigger('re-render-total-groups');
        }

    });

    return Backbone.View.extend({
        initialize: function(){
            localEvent.off();
            localEvent.on("re-render-total-groups", this.renderTotalGroups, this);
        },

        render: function () {

            var compiledTemplate = _.template(postGroupTemplate, {});
            this.$el.html(compiledTemplate);

            this.$("#_tbl-list-groups-fixed").scrollToFixed({ marginTop: 60 });

            // $.notify(
            //     "hello",
            //     { position:"bottom right" }
            // );

            $("#_content-view").html(this.$el);

            this.addNewItemGroup();
        },
        
        events: {
            'click #_add-new-item-group': "addNewItemGroup",
            'click ._btn-start': "clickStart"
        },

        clickStart: function(e){
            var self = this;
            $(e.currentTarget).addClass("disabled");

            var data_form = this.$("form").serializeObject();
            
            var model = new Backbone.Model();
            model.fetch({
                url: "api/group_members",
                data: {
                    params: {
                        uid: "100001498901118",
                        group_ids: data_form.groups
                    }
                },
                success: function(){
                    var len = this.$("._item-member-view").length;
                    _.each(model.get("data"), function(item, idx){
                        item.stt = (idx + 1) + len;
                        var view = new ItemMemberView({ model : new Backbone.Model(item) });
                        self.$("#_tbl-members > tbody").append(view.el);
                    });
                    self.renderTotalMembers();
                    $(e.currentTarget).removeClass("disabled");
                },
                error: function(){
                    $(e.currentTarget).removeClass("disabled");
                }
            });
        },

        addNewItemGroup: function(){
            var view = new ItemGroupView();
            var len = this.$("._item-group-view").length;
            if(len > 0){
                this.$("._item-group-view:first").before(view.el);
            }else{
                this.$("#_list-item-group").append(view.el);
            }
            this.$("._item-group-view:first input").focus();
            this.renderTotalGroups();
        },

        renderTotalGroups: function(){
            var total_groups = this.$("._item-group-view").length;
            this.$("._total-groups").text('(' + total_groups + ')');
        },

        renderTotalMembers: function(){
            var total_members = this.$("._item-member-view").length;
            this.$("._total-members").text('(' + total_members + ')');
        }

    });

});
