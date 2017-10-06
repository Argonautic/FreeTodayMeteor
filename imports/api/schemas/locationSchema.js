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
        /*custom: function() {
            if (!(-180 <= this.value[0] <= 180)) {
                return 'lngOutOfRange';
            }
            if (!(-90 < this.value[1] <= 90)) {
                return 'latOutOfRange';
            }
            return true;
        }*/
    },
    'location.coordinates.$': {
        type: Number,
    },
});