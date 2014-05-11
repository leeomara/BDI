/**
 * bdi/collection/current-treatments-collection.js
 * Collection of Current Treatments
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

CurrentTreatmentCollection = Backbone.Collection.extend({
    model: Treatment,
    key: 'currentTreatments'
});