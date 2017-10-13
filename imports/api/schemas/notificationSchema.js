import SimpleSchema from 'simpl-schema';

import userSchema from './userSchema';
import dateSchema from './dateSchema';
import locationSchema from './locationSchema';

export default notificationSchema = new SimpleSchema({
    recipient: SimpleSchema.RegEx.Id,
    active: {
        type: Boolean,
        defaultValue: true
    },
    content: String
});