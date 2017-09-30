import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class MapComponent extends Component {
    render() {
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={this.props.center}
            >
                {this.props.isMarkerShown && <Marker />}
            </GoogleMap>
        );
    }
}

const trackedMap = withTracker(() => {
    const currentUser = Meteor.user();
    const userName = currentUser && currentUser.profile.name;

    return {
        currentUser,
        userName
    };
})(MapComponent);

export default withScriptjs(withGoogleMap(trackedMap));