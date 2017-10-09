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
        custom: function() {
            if (this.value <= new Date()) {
                return "Start Date has already passed";
            }
        }
    },
    endDate: {
        type: Date,
        custom: function() {
            const startDate =  this.field('startDate').value;
            const endDate = this.value;
            const datesValid = startDate >= endDate;

            // A Date object passes a >= check with another Date object of the same
            // time and day, so two comparisons have to be made
            if (datesValid || (datesValid && startDate.getTime() >= endDate.getTime())) {
                return "End Date can't be sooner than Start Date, silly"
            }
        }
    },
    eventLocation: locationSchema
});