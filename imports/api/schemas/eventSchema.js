import SimpleSchema from 'simpl-schema';

import positionSchema from './positionSchema';

export default eventSchema = new SimpleSchema({
    owner: {
        type: String,
        optional: true
    },
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
    eventPosition: positionSchema
});