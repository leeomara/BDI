/**
 * bdi/views/question-view.js
 * Backbone View that represents a Question
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

var QuestionView = Backbone.View.extend({

    template: '#questionTemplate',


    events:{
        // 'click #hootShareIntent': 'intentShare',
        // 'click #hootSharePost':'postShare',
        // 'focus #pagelet_composer textarea':'textAreaFocus'
    },

    /**
    * initialize
    * Initializer for QuestionView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "render");

        var that = this;
        if (options.model) {
            this.model = options.model;
        }

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