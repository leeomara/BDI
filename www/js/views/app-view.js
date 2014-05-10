/**
 * bdi/views/app-view.js
 * Backbone View that representsthe total Application
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

var AppView = Backbone.View.extend({



    questionCollection: null,
    questionContainer: '.questionContainer',
    allDoneTemplate: '#doneTemplate',
    events:{
        'click .next': 'getNextQuestion'
    },

    /**
    * initialize
    * Initializer for AppView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "getNextQuestion", "showEndScreen");

        var that = this;
        this.questionCollection = options.questionCollection;

    },


    /**
    * getNextQuestion
    * Retrieves the next question. If no question is avaiable, then show the end screen
    * @param event - jQuery Event
    */
    getNextQuestion: function(event) {
        var question = this.questionCollection.getNextQuestion();
        if (question === null) {
            this.showEndScreen();
        }
        else{
            var questionView = new QuestionView({model:question});
            var el = questionView.render().el;

            var $questionContainer = this.$(this.questionContainer);
            $questionContainer.html(el);
        }
    },


    /**
    * showEndScreen
    * Show the final screen
    */
    showEndScreen: function() {
        var templater = $(this.allDoneTemplate).html();
        var rendered = Mustache.to_html(templater, {});
        this.$el.html(rendered);
        return this;
    }



});