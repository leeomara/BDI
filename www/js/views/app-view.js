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
    pastTreatments: null,
    questionContainer: '.questionContainer',
    treatmentsContainer: '.treatmentsContainer',
    appContainer: '.appContainer',
    endContainer: '.endContainer',
    questionResultsContainer: '.questionResultsContainer',
    timestamp: null,
    currQuestion: null,
    reportsCalculated: false,
    currView: '.questionContainer',
    events:{
        'click .next': 'getNextQuestion',
        'click .questionsView': 'getNextQuestion',
        'click .treatmentsView': 'showTreatments',
        'click .reportsView': 'showReport',
    },
    
    navbar: {
    	'questions' : {'icon' : '.questionsView', 'available' : 'img/icon_edit.svg', 'selected' : 'img/icon_edit_on.svg'},
    	'treatments' : {'icon' : '.treatmentsView', 'available' : 'img/icon_treatment.svg', 'selected' : 'img/icon_treatment_on.svg'},
    	'reports' :  {'icon' : '.reportsView', 'available' : 'img/icon_reports_history.svg', 'selected' : 'img/icon_reports_history_on.svg'}
    },

    /**
    * initialize
    * Initializer for AppView
    * Called on construction of object
    */
    initialize : function(options) {

        //Bind this to the following functions
        _.bindAll(this, "getNextQuestion", "showEndScreen", "showReport", "showTreatments", "hideAllContainers");

        var that = this;
        this.setNavbarState('questions');
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
    	this.setNavbarState('questions');
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
        this.hideAllContainers();
        this.$(this.endContainer).show();

        this.$('footer').hide();
        this.currView = this.endContainer;
        return this;
    },



    /**
    * showReport
    * Shows the report section
    */
    showReport: function(event) {
    	this.setNavbarState('reports');
        if (this.currView != this.questionResultsContainer) {
            var $resultContainer = this.$(this.questionResultsContainer);
            //Just show the report if it has been calculated
            if (!this.reportsCalculated) { // Shows Reports Screen

                var twoWeeks = moment().subtract('days', 14);
                //Go through and calculate the analytics
                this.questionCollection.each(function(question){
                    // question.calculateResults(1399782707164,twoWeeks.valueOf());

                    //HARD CODED FOR DEMO
                    question.calculateResults(1399782707164,1399828159068);

                    var resultView = new ResultView({model:question});
                    $resultContainer.append(resultView.render().el);
                });
                this.reportsCalculated = true;
            }
            this.hideAllContainers();
            $resultContainer.show();
            this.currView = this.questionResultsContainer;
        }
        else{ // Shows Questionaire Screen
            this.hideAllContainers();
            this.$('footer').show();
            this.$(this.questionContainer).show();
            this.currView = this.questionContainer;
        }

    },

    showTreatments :function(){
    	this.setNavbarState('treatments');
    	this.hideAllContainers();
        this.$(this.treatmentsContainer).show();
        this.currView = this.treatmentsContainer;
    },



    /**
    * hideAllContainers
    * Hides all of the containers
    */
    hideAllContainers:function() {
        this.$('footer').hide();
        this.$(this.questionContainer).hide();
        this.$(this.questionResultsContainer).hide();
    },
    
    setNavbarState : function(selected) {
    	this.$(this.navbar.questions.icon).attr('src', this.navbar.questions.available);
    	this.$(this.navbar.reports.icon).attr('src', this.navbar.reports.available);
    	this.$(this.navbar.treatments.icon).attr('src', this.navbar.treatments.available);
    	this.$(this.navbar[selected].icon).attr('src', this.navbar[selected].selected);
    }
    
    



});