import { Meteor } from 'meteor/meteor';

Meteor.publish('users.participants-for-event', function(event) {
    return Meteor.users.find({ _id: { $in: event.eventParticipants }}, { fields: { profile: 1 }});
});

Meteor.publish('users.server-for-me', function() {
    return Meteor.users.find({ _id: this.userId }, { fields: { notifications: 1 }});
});