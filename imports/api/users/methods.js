import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import eventSchema from '../schemas/eventSchema';

export const newEventAttendee = new ValidatedMethod({
    name: 'newEventAttendee',
    validate: function() {
        return new SimpleSchema({
            event: eventSchema,
            attendee: String
        })
    },
    run(event, attendee) {

    }
});