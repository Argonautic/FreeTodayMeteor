import { Meteor } from 'meteor/meteor';

Meteor.publish('events.all-public-events', function() {
    return Events.find({});
});

Meteor.publish('events.events-around-search', function(centerCoordinates) {
    return Events.find({
        $and: [
            {
                'eventLocation.location': {
                    $geoWithin: {
                        $centerSphere: [centerCoordinates, 30 / 3963.2]
                    }
                }
            },
            {
                endDate: {
                    $gt: new Date()
                }
            }
        ]
    })
});

Meteor.publish('events.my-events', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Events.find({
        'owner._id': this.userId
    });
});

Meteor.publish('events.not-my-events', function() {
    return Events.find({
        'owner._id': {$ne: this.userId}
    });
});