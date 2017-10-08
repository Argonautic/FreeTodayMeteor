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
            startDate =  this.field('startDate').value;
            endDate = this.value;

            // A Date object seems to pass a >= check with another Date object of the same
            // time and day, so two comparisons have to be made
            if (startDate >= endDate ||
                (startDate >= endDate && startDate.getTime() >= endDate.getTime())) {
                return "End Date can't be sooner than Start Date, silly"
            }
        }
    },
    eventLocation: locationSchema
});