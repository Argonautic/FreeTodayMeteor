import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
//import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow } from "react-google-maps"

import EventMarker from './subcomponents/eventMarker';



class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEventPos: null
        };

        this.makeNewEvent = this.makeNewEvent.bind(this);
    }

    makeNewEvent(event) {
        const eventCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        console.log(eventCenter);
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={this.props.center}
                onRightClick={this.makeNewEvent}
            >

                <InfoWindow position={{lat: 40.76318618108141, lng: -73.91241073608398}}>
                    Hi
                </InfoWindow>
                {/*<NewEventBox position={this.state.newEventPos}/>*/}
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

//export default withScriptjs(withGoogleMap(trackedMap));