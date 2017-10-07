import React, { Component } from 'react';

import Searchbar from './searchbar';
import MapComponent from './mapComponent/mapComponent';

import '/public/style/map';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: {lat: 40.7604247, lng: -73.9178987}
        };
    }

    render() {
        console.log('Map rendered');
        return (
            <div id="mapCSSWrapper">
                <div id="mapContainer" />
                <MapComponent
                    allEvents={this.props.allEvents}
                    currentUser={this.props.currentUser}
                    center={this.state.center}
                />
                <Searchbar />
            </div>
        );
    }
}