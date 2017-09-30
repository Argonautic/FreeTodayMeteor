import { withTracker } from 'meteor/react-meteor-data'
import React, { Component } from 'react';

class Map extends Component {
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user()
    }
})(Map);