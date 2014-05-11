/**
 * bdi/models/question-model.js
 * Backbone Model for Questions
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 *
 */
Question = Backbone.Model.extend({

    defaults: {
        "name":  null,
        "type": null,
        "value": 5,
        "seen": false,
        "avgShort": '',
        "avg": 5,
        "avgTime": 5,
        "avgTimeUp": false,
        "avgTreatment": 5,
        "avgTreatmentUp": false,
    },

    key: 'question-',

    /**
    * initialize
    * Called after the constructor.
    */
    initialize: function () {
        this.loadFromLocal();
    },


    /**
    * loadFromLocal
    * Loads the value to local storage
    */
    loadFromLocal:function() {
        var data = localStorage.getItem(this.key+this.get('id'));
        if (data !== null){
          data = JSON.parse(data);
        }else{
          data = [];
        }
        //Make sure we are only using ints
        for (var i in data) {
            data[i]['value'] = parseInt(data[i]['value']);
        };
        this.set('data',data);
    },

    /**
    * saveToLocal
    * Saves the value to local storage
    * @param Timestamp - Timestamp fo the session
    */
    saveToLocal:function(Timestamp){

        var data =  this.get('data');
        var dataObj = {};
        dataObj['timestamp'] = Timestamp;
        dataObj['value'] = parseInt(this.get('value'));
        data.push(dataObj);
        var stringify = JSON.stringify(data);
        //Get the date
        localStorage.setItem(this.key+this.get('id'), stringify);
    },


    /**
    * calculateResults
    * Calculates the analytics for this question
    * @param TreatmentTimestamp - Timestamp from the start of the last treatment
    * @param DateTimestamp - Timestamp from the start of the date we want to compare
    */
    calculateResults: function(TreatmentTimestamp, DateTimestamp) {


        //Running Average
        var data = this.get('data');

        var avg = this.findAverage(data);
        this.set('avg',avg);

        var avgTime = this.findDiffAverage(data, DateTimestamp);
        if (avgTime > 0){
            this.set('avgTimeUp',true);
        }
        this.set('avgTime', avgTime);

        var avgTreatment = this.findDiffAverage(data, TreatmentTimestamp);
        this.set('avgTreatment', avgTreatment);
        if (avgTreatment > 0){
            this.set('avgTreatmentUp',true);
        }

    },


    findDiffAverage: function(dataSet, timestamp) {
        //Treatment Average
        var timestampBefore = _.filter(dataSet, function(dataObj) {
            return dataObj.timestamp < timestamp;

        });

        var beforeAverage = this.findAverage(timestampBefore);

        var timestampAfter = _.filter(dataSet, function(dataObj) {
            return dataObj.timestamp > timestamp;
        });

        var afterAverage = this.findAverage(timestampAfter);


        var diff = ((afterAverage - beforeAverage)/ beforeAverage)*100;
        // //
        // if (afterAverage == 0){
        //     diff = (0 - beforeAverage)*100;
        // }

        // if (beforeAverage == 0){
        //     diff = (afterAverage)*100;
        // }


        diff = parseFloat(diff).toFixed(0);
        return diff;

    },

    findAverage: function(dataSet) {

        var total = 0;
        _.each(dataSet, function(dataObj){
            total += dataObj.value;
        });
        var avg;
        if (total == 0 || dataSet.length == 0){
            avg = 0;
        }
        else{
            avg = total/dataSet.length;
        }
        avg = parseFloat(avg).toFixed(1);
        return avg;
    }


});