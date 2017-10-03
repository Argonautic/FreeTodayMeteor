import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

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

export const deleteEvent = new ValidatedMethod({
    name: 'deleteEvent',
    validate: function(eventId) {
        event = Events.findOne(eventId);

        if (!event) {
            throw new Meteor.Error('Event ID not found')
        } else if (event.owner !== this.userId) {
            throw new Meteor.Error("This isn't your event");
        }
    },
    run(eventId) {
        if (!event) {
            throw new Meteor.Error('Event ID not found')
        } else if (event.owner !== this.userId) {
            throw new Meteor.Error("This isn't your event");
        }

        Events.remove({ '_id': eventId });
    }
});