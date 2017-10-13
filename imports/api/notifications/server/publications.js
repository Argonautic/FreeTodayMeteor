import { Meteor } from 'meteor/meteor';

Meteor.publish('notifications.my-notifications', function() {
    return Notifications.find({ recipient: this.userId }, { limit: 10 });
});