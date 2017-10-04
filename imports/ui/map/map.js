import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, Marker } from 'react';
import { Loader } from 'semantic-ui-react';

import MapComponent from './mapComponent';

import '/public/style/map';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {lat: 40.7604247, lng: -73.9178987}
        }
    }

    render() {
        return (
            !this.props.ready ? <Loader id="loader" active inline="centered"/> :

            <div>
                <MapComponent
                    allEvents={this.props.allEvents}
                    currentUser={this.props.currentUser}
                    center={this.state.center}
                />
            </div>
        );
    }
}

export default trackedMap = withTracker(() => {
    const handle = Meteor.subscribe('events.all-public-events');
    const currentUser = Meteor.user();

    return {
        ready: handle.ready(),
        allEvents: Events.find({}).fetch(),
        currentUser,
    };
})(Map);