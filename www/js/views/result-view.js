/**
 * bdi/views/result-view.js
 * Backbone View that represents a Result
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

var ResultView = Backbone.View.extend({

    template: '#questionResultsTemplate',
    timestamp: null,


    /**
    * initialize
    * Initializer for QuestionView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "render", "rangeChange");

        var that = this;

        this.model = options.model;

    },


    /**
    * render
    * Renders the template
    */
    render: function() {
        var templater = $(this.template).html();
        var rendered = Mustache.to_html(templater, this.model.toJSON());
        this.$el.html(rendered);
        return this;
    }





});