import SimpleSchema from 'simpl-schema';

import userSchema from './userSchema';
import dateSchema from './dateSchema';
import locationSchema from './locationSchema';

export default eventSchema = new SimpleSchema({
    owner: userSchema,
    eventName: {
        type: String,
        min: 3,
        max: 50
    },
    eventDescription: {
        type: String,
        max: 500,
        optional: true
    },
    eventDates: dateSchema,
    // Can modify eventParticipants to be a separate collection if this app ever gets
    // yuge, so that queries are faster than worst case O(n)
    eventParticipants: {
        type: Array,
        defaultValue: []
    },
    'eventParticipants.$': {
        type: String
    },
    eventLocation: locationSchema
});