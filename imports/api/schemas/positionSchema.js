import SimpleSchema from 'simpl-schema';

export default positionSchema = new SimpleSchema({
    lat: {
        type: Number,
        min: -90,
        max: 90
    },
    lng: {
        type: Number,
        min: -180,
        max: 180
    }
});