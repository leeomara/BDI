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
    "value":   null,
    "seen": false
  },

  /**
   * initialize
   * Called after the constructor.
   */
  initialize: function () {
    // //If we have a name then we want to grab the value
    // if (this.get("name") != undefined &&  this.get("name") !== null){
    //   if (this.get("isShown") === null){
    //     //Check local storage for a value
    //     var isShown = localStorage.getItem(this.get("name")+this.isShownKey);
    //     if (isShown === null){
    //       isShown = false

    //     }
    //     //Reset string true false to their native
    //     if (isShown == 'true'){
    //         isShown = true;
    //     }
    //     if (isShown == 'false'){
    //       isShown = false;
    //     }
    //     this.set("isShown",isShown);
    //   }
    // }

  },

  /**
   * saveToLocal
   * Saves the value to local storage
   */
  saveToLocal:function(SessionDate){

    //TODO
    //Get the date
    localStorage.setItem(this.get("name")+this.isShownKey, this.get("isShown"));
  }


});