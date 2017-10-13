import { Meteor } from 'meteor/meteor';

Meteor.publish('users.participants-for-event', function(userIds) {
    return Meteor.users.find({
        _id: { $in: userIds }
    });
});

Meteor.publish('users.notifications-for-me', function() {
    return Meteor.users.find({ _id: this.userId }, { fields: { notifications: 1 }});
});