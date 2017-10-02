import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, Marker } from 'react';

import MapComponent from './mapComponent';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: { lat: 40.760262, lng: -73.919362 }
        }
    }

    render() {
        return (
            !this.props.ready ? <div>Loading...</div> :
            <div>
                <MapComponent currentUser={this.props.currentUser} center={this.state.center} />
            </div>
        )
    }
}

export default trackedMap = withTracker(() => {
    const handle = Meteor.subscribe('events.my-events');
    const currentUser = Meteor.user();

    return {
        ready: handle.ready(),
        myEvents: Events.find({}).fetch(),
        currentUser,
    };
})(Map);