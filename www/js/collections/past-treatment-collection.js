/**
 * bdi/collection/past-treatments-collection.js
 * Collection of Past Treatments
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

PastTreatmentCollection = Backbone.Collection.extend({
    model: Treatment,
    key: 'pastTreatments'

});