import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import eventSchema from '../schemas/eventSchema';

Events = new Mongo.Collection('events');
Events.attachSchema(eventSchema);

Meteor.methods({

});


export const submitNewEvent = new ValidatedMethod({
    name: 'submitNewEvent',
    validate: eventSchema.validator({ clean: true }),
    run(newEvent) {
        if (!this.userId) {
            throw new Meteor.Error('You must be logged in to create an event, you sly devil');
        } else if (newEvent.owner._id !== this.userId) {
            throw new Meteor.Error("You can't create an event in someone else's ownership");
        }

        Events.insert(newEvent);
    }
});

export const signupForEvent = new ValidatedMethod({
    name: 'signupForEvent',
    validate: function(eventId) {
        event = Events.findOne(eventId);

        const Id = this.userId;

        if (Id === null) {
            throw new Meteor.Error("You must log in to sign up for an event")
        } else if (event.eventParticipants[Id]) {
            throw new Meteor.Error("You're already signed up")
        }
    },
    run(eventId) {
        event = Events.findOne(eventId);
        Id = this.userId;

        Events.update({ _id: eventId }, { $set: {
            eventParticipants: {  Id: true },
        }});
    }
});

export const updateEvent = new ValidatedMethod({
    name: 'updateEvent',
    validate: new SimpleSchema({
        eventId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id,
        },
        updatedEvent: eventSchema.omit('owner')
    }).validator({ clean: true }),
    run({eventId, updatedEvent}) {
        event = Events.findOne(eventId);

        if (!event) {
            throw new Meteor.Error("Event to update doesn't exist");
        } else if (!this.userId || this.userId !== event.owner._id) {
            throw new Meteor.Error("You don't have permission to edit this event");
        }

        Events.update({ _id: eventId }, { $set: updatedEvent });
    }
});

export const deleteEvent = new ValidatedMethod({
    name: 'deleteEvent',
    validate: function(eventId) {
        event = Events.findOne(eventId);

        if (!event) {
            throw new Meteor.Error("Event to delete doesn't exist")
        } else if (event.owner._id !== this.userId) {
            throw new Meteor.Error("You don't have permission to delete this event");
        }
    },
    run(eventId) {
        Events.remove({ '_id': eventId });
    }
});