import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import notificationSchema from '../schemas/notificationSchema';

Notifications = new Mongo.Collection('notifications');
Notifications.attachSchema(notificationSchema);

export const notificationSeen = new ValidatedMethod({
    name: 'notificationSeen',
    validate: new SimpleSchema({
        notificationId: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator({ clean: true }),
    run({notificationId}) {
        const notification = Notifications.findOne(notificationId);

        if (notification.recipient !== this.userId) {
            throw Meteor.Error("You're not supposed to be seeing this notification, eh?")
        }

        Notifications.update({ _id: notificationId }, { $set: { active: false }});
    }
});