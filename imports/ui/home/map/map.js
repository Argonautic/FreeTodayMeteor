import React, { Component, Marker } from 'react';

import MapComponent from './mapComponent';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: { lat: 40.760262, lng: -73.919362 }
        }
    }

    render() {
        return (
            <div>
                <MapComponent center={this.state.center} />
            </div>
        )
    }
}