import { Meteor } from 'meteor/meteor'

export const newEventAttendee = (event, attendeeId) => {
    if (event.eventParticipants.includes(attendeeId) || attendeeId === event.owner._id) {
        return;
    }

    attendeeName = Meteor.users.find({
        _id: attendeeId }, { fields: {'profile.name': 1}
    }).fetch()[0].profile.name;

    const notification = `${attendeeName} has signed up for ${event.eventName}`;

    Meteor.users.update({_id: event.owner._id }, {
        $push: {
            notifications: {
                $each: [notification],
                $slice: -10
            }
        }
    })
};