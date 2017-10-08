import SimpleSchema from 'simpl-schema';

import locationSchema from './locationSchema';

export default eventSchema = new SimpleSchema({
    owner: {
        type: String,
        autoValue: function() {
            return this.userId || 'none';
        }
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
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
        custom: function() {
            if (this.field('startDate').value >= this.value) {
                return "End Date can't be sooner than Start Date, silly"
            }
        }
    },
    eventLocation: locationSchema
});