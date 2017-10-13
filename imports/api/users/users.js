import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { HTTP } from 'meteor/http';

Accounts.onCreateUser((options, user) => {
    if (user.services.facebook ) {

        const fbAccessToken = user.services.facebook.accessToken;
        const pictureEndpoint = `https://graph.facebook.com/v2.10/${user.services.facebook.id}/picture`;

        picture = HTTP.call('GET', pictureEndpoint, {
            params: {
                redirect: false,
                type: 'large'
            }
        });

        options.profile.picture = picture.data.data.url;

    } else if (user.services.twitter) {
        options.profile.picture = user.services.twitter.profile_image_url_https;
    }

    user.profile = options.profile;
    //user.notifications = [];
    return user;
});