import SimpleSchema from 'simpl-schema'

export default dateSchema = new SimpleSchema({
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
            const startDate =  this.field('eventDates.startDate').value;
            const endDate = this.value;
            const datesValid = startDate >= endDate;

            // A Date object passes a >= check with another Date object of the same
            // time and day, so two comparisons have to be made
            if (datesValid || (datesValid && startDate.getTime() >= endDate.getTime())) {
                return "End Date can't be sooner than Start Date, silly"
            }
        }
    },
});