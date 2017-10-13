import { Meteor } from 'meteor/meteor';

Meteor.publish('users.participants-for-event', function(userIds) {
    return Meteor.users.find({
        _id: { $in: userIds }
    });
});