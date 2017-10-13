import { Meteor } from 'meteor/meteor';

import '/imports/startup/server';
//import '/imports/api/map';
import '/imports/api/events/events';
import '/imports/api/users/users';

Meteor.startup(() => {
    Events._ensureIndex({ 'eventLocation.location': "2dsphere" });
    Events._ensureIndex({ 'eventParticipants': 1 })
});