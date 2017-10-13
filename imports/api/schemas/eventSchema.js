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
    eventParticipants: {
        type: Object,
        defaultValue: {},
        blackbox: true
    },
    eventLocation: locationSchema
});