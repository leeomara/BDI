/**
 * bdi/models/question-model.js
 * Backbone Model for Questions
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 *
 */
Treatment = Backbone.Model.extend({

    defaults: {
        "id": null,
        "name":  null,
        "timestampStart": null,
        "timestampEnd": null
    },

    key: 'treatment-'




});