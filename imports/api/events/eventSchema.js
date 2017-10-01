export default eventSchema = new SimpleSchema({
    name: {
        type: String,
        min: 3,
        max: 50
    },
    description: {
        type: String,
        max: 500,
        optional: true
    },
    position: {
        type: Object,
    }
});