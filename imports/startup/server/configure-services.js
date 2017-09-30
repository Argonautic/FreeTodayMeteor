const services = Meteor.settings.private.oAuth;

const configureServices = () => {
    if (services) {
        for (let service in services) {
            ServiceConfiguration.configurations.upsert({ service }, {
                $set: services[ service ]
            });
        }
    }
};

configureServices();
