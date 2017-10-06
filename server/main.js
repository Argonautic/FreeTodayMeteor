import { Meteor } from 'meteor/meteor';

import '/imports/startup/server';
//import '/imports/api/map';
import '/imports/api/events/events';

Meteor.startup(() => {
    Events._ensureIndex({ 'eventLocation.location': "2dsphere" });
});