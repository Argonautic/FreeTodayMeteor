import { Meteor } from 'meteor/meteor';

Meteor.methods({
    getLocation() {
        const showPos = (position) => {
            console.log(position);
        };

        const options = {
            timeout: 2000,
        };

        const error = (err) => {
            console.log(`ERROR(${err.code}): ${err.message}`);
            throw new Meteor.Error(`${err.code}`, err.message);
        };


        if (navigator.geolocation) {
            console.log('navigator.geolocation found');
            navigator.geolocation.getCurrentPosition(showPos, error, options);
        } else {
            console.log('no navigator.geolocation');
        }
    }
});

/*export const getLocation = new ValidatedMethod({
    name: 'getLocation',
    validate: {},
    run() {
        const showPos = (position) => {
            console.log(position);
            return position;
        };

        const options = {
            timeout: 2000,
        };

        const error = (err) => {
            console.log(`ERROR(${err.code}): ${err.message}`);
            throw new Meteor.Error(`${err.code}`, err.message);
        };


        if (navigator.geolocation) {
            console.log('navigator.geolocation found');
            navigator.geolocation.getCurrentPosition(showPos, error, options);
        } else {
            console.log('no navigator.geolocation');
        }
    }
})*/