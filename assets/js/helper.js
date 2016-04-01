define([
    'jquery',
    'underscore',
    'backbone',
    'nprogress'
], function ($, _, Backbone, NProgress) {

    $.ajaxSetup({

        beforeSend:function(){
            NProgress.start();
        },
        complete:function(xhr, status){
            NProgress.done();
        }

    });

    /**
     * @author: vanhs
     * @created_time: 04:27 22/06/2015
     * @description: Hàm lấy dữ liệu form, trả về dạng object
     * @returns {{}}
     */
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            var value = this.value;
            //if use autoNumeric
            var $this = $("[name='" + this.name + "']");
            if($this.hasClass("autoNumeric")) { value = $this.autoNumeric('get'); }

            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(value || '');
            } else {
                o[this.name] = value || '';
            }
        });
        return o;
    };

});

