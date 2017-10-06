import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import eventSchema from '../schemas/eventSchema';

Events = new Mongo.Collection('events');
Events.attachSchema(eventSchema);
Events._ensureIndex({ 'eventLocation.location': "2dsphere" });

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
    validate: eventSchema.validator({ clean: true }),
    run(newEvent) {
        if (!this.userId) {
            throw new Meteor.Error('You must be logged in to create an event, you sly devil');
        } else {
            newEvent.owner = this.userId;
        }

        Events.insert(newEvent);
    }
});

export const updateEvent = new ValidatedMethod({
    name: 'updateEvent',
    validate: new SimpleSchema({
        eventId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
        },
        updatedEvent: eventSchema
    }).validator({ clean: true }),
    run({eventId, updatedEvent}) {
        event = Events.findOne(eventId);

        if (!event) {
            throw new Meteor.Error("Event to update doesn't exist");
        } else if (!this.userId || this.userId !== event.owner) {
            throw new Meteor.Error("You don't have permission to edit this event");
        } else {
            updatedEvent.owner = this.userId;
        }

        Events.update({ _id: eventId }, {$set: updatedEvent});
    }
});

export const deleteEvent = new ValidatedMethod({
    name: 'deleteEvent',
    validate: function(eventId) {
        event = Events.findOne(eventId);

        if (!event) {
            throw new Meteor.Error("Event to delete doesn't exist")
        } else if (event.owner !== this.userId) {
            throw new Meteor.Error("You don't have permission to delete this event");
        }

    },
    run(eventId) {
        Events.remove({ '_id': eventId });
    }
});