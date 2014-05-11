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
    "seen": false
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
      data = {};
    }
    this.set('data',data);
  },

  /**
   * saveToLocal
   * Saves the value to local storage
   * @param Timestamp - Timestamp fo the session
   */
  saveToLocal:function(Timestamp){

    var data =  this.get('data');
    data[Timestamp] = this.get('value');
    var stringify = JSON.stringify(data);
    //Get the date
    localStorage.setItem(this.key+this.get('id'), stringify);
  }


});