import SimpleSchema from 'simpl-schema';

export default locationSchema = new SimpleSchema({
    location: Object,
    'location.type': {
        type: String,
        autoValue: function() {
            return 'Point'
        }
    },
    'location.coordinates': {
        type: Array,
        minCount: 2,
        maxCount: 2,
    },
    'location.coordinates.$': {
        type: Number,
    },
});