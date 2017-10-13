import SimpleSchema from 'simpl-schema';

export default userSchema = new SimpleSchema({
    _id: String,
    profile: Object,
    'profile.name': String,
    'profile.picture': String
});