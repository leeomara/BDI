/**
 * bdi/views/app-view.js
 * Backbone View that representsthe total Application
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

var AppView = Backbone.View.extend({



    questionCollection: null,
    currentTreatments: null,
    currentTreatments: null,
    pastTreatments: null,
    questionContainer: '.questionContainer',
    allDoneTemplate: '#doneTemplate',
    appContainer: '.appContainer',
    questionResultsContainer: '.questionResultsContainer',
    timestamp: null,
    currQuestion: null,
    reportsCalculated: false,
    events:{
        'click .next': 'getNextQuestion',
        'click .report': 'showReport'
    },

    /**
    * initialize
    * Initializer for AppView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "getNextQuestion", "showEndScreen", "showReport", "hideAllContainers");

        var that = this;
        this.questionCollection = options.questionCollection;
        this.pastTreatments = options.pastTreatments;
        this.currentTreatments = options.currentTreatments;
        this.timestamp = new Date().getTime();

    },


    /**
    * getNextQuestion
    * Retrieves the next question. If no question is avaiable, then show the end screen
    * @param event - jQuery Event
    */
    getNextQuestion: function(event) {
        //Save the current one
        if (this.currQuestion !== null) {
            this.currQuestion.saveToLocal(this.timestamp);
        }
        this.currQuestion = this.questionCollection.getNextQuestion();
        if (this.currQuestion === null) {
            this.showEndScreen();
        }
        else{
            var questionView = new QuestionView({model:this.currQuestion});
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
        this.$(this.appContainer).html(rendered);
        return this;
    },



    /**
    * showReport
    * Shows the report section
    */
    showReport: function(event) {

        var $resultContainer = this.$(this.questionResultsContainer);
        //Just show the report if it has been calculated
        if (!this.reportsCalculated) {

            var twoWeeks = moment().subtract('days', 14);
            //Go through and calculate the analytics
            this.questionCollection.each(function(question){
                question.calculateResults(0,twoWeeks.valueOf());
                var resultView = new ResultView({model:question});
                $resultContainer.append(resultView.render().el);
            });
            this.reportsCalculated = true;
        }
        this.hideAllContainers();
        $resultContainer.show();
    },


    /**
    * hideAllContainers
    * Hides all of the containers
    */
    hideAllContainers:function() {
        this.$('footer').hide();
        this.$(this.questionContainer).hide();
        this.$(this.questionResultsContainer).hide();
    }



});