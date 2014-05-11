/**
 * bdi/collection/past-treatments-collection.js
 * Collection of Past Treatments
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

PastTreatmentCollection = Backbone.Collection.extend({
    model: Treatment,
    key: 'pastTreatments',

    /**
    * loadFromLocal
    * Loads the value to local storage
    */
    loadFromLocal:function() {
        var data = localStorage.getItem(this.key);
        if (data !== null){
          data = JSON.parse(data);
        }else{
          data = [];
        }
        var that = this;
        _.each(data, function(treatmentJSON){
            var treatment = new Treatment(treatmentJSON);
            that.add(treatment);
        });
    }

});