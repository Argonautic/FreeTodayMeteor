import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import eventSchema from './eventSchema';

const Events = new Mongo.Collection('events');
Events.attachSchema(eventSchema);

Meteor.methods({
    submitNewEvent() {
        return `${this.userId}`;
    }
});

export const submitNewEvent2 = new ValidatedMethod({
    name: 'submitNewEvent2',
    validate: eventSchema.validator(),
    run({eventName, eventDescription, eventPosition}) {
        Events.insert({
            owner: this.userId,
            name: eventName,
            description: eventDescription,
            position: eventPosition
        });
    }
});