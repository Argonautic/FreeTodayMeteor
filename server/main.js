import { Meteor } from 'meteor/meteor';

import '/imports/startup/server';

Meteor.startup(() => {
    Events._ensureIndex({ 'eventLocation.location': "2dsphere" });
    Events._ensureIndex({ 'eventParticipants': 1 });
    Meteor.users._ensureIndex({ '_id': 1});
    Notifications._ensureIndex({ 'recipient': 1 });
});