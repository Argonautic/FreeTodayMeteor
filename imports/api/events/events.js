import { ValidatedMethod } from 'meteor/mdg:validated-method';

import eventSchema from '../schemas/eventSchema';

Events = new Mongo.Collection('events');
Events.attachSchema(eventSchema);

Meteor.methods({
    'testInsert'() {
        Events.insert({
            eventName: "A name",
            eventDescription: "A desc",
            eventPosition: {lat: 100, lng: -70},
        });
    }
});


export const submitNewEvent = new ValidatedMethod({
    name: 'submitNewEvent',
    validate: eventSchema.validator(),
    run(newEvent) {
        if (!this.userId) {
            throw new Meteor.Error('You must be logged in to create an event, you sly devil');
        } else {
            newEvent.owner = this.userId;
        }
        Events.insert(newEvent);
    }
});