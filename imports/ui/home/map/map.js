import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import MapComponent from './mapComponent';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: { lat: 40.760262, lng: -73.919362 }
        }
    }

    componentWillMount() {
        /*Meteor.call('getLocation', (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res);
            }
        });*/
    }

    render() {
        return (
            <div>
                <MapComponent
                    isMarkerShown={false}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBf1U3dMPBNrkxefoZVL9U4yQEP2sip-c&callback=initMap"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100vh` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={this.state.center}
                />
            </div>
        )
    }
}

/*googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"*/