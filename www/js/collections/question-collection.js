/**
 * bdi/collection/question-collection.js
 * Collection of Questions
 * Author - Chris Noble @noblezilla
 * Copyright (C) 2014
 *
 */

QuestionsCollection = Backbone.Collection.extend({
    model: Question,


    /**
    * getNextQuestion
    * Returns a message that has not been seen. It then sets that message seen to true
    * If all the messages have been seen then it returns null
    */
    getNextQuestion: function() {
        //Grab a question that has not been seen
        var message = this.find(function (message) {
            var seen = message.get('seen');
            if (seen === undefined || seen === false) {
                return true;
            } else {
                return false;
            }
        });

        //No messages left
        if (message === undefined) {
            return null;
        }
        else{
            message.set('seen', true);
        }
        return message;
    }

});