import { Meteor } from 'meteor/meteor';

Meteor.publish('events.my-events', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Events.find({
        owner: this.userId
    });
});