import React, { Component } from 'react';
import { render } from 'react-dom';

import MapComponents from './mapComponents/mapComponents'
import mapStyles from './mapStyles';

import '/public/style/map';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.getLocation();

        this.constructEventWindow = this.constructEventWindow.bind(this);
    }

    getLocation() {
        const showPos = (position) => {
            console.log(position);
        };

        const options = {
            timeout: 2000,
        };

        const error = (err) => {
            console.log(`ERROR(${err.code}): ${err.message}`);
            throw new Meteor.Error(`${err.code}`, err.message);
        };


        if (navigator.geolocation) {
            console.log('navigator.geolocation found');
            navigator.geolocation.getCurrentPosition(showPos, error, options);
        } else {
            console.log('no navigator.geolocation');
        }
    }

    constructEventWindow() {
        this.eventDOM = document.createElement('div');
        this.eventDOM.id = 'eventWindow';
        this.eventWindow = new google.maps.InfoWindow({ content: this.eventDOM });
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('mapContainer'), {
            zoom: 15,
            center: {lat: 40.7604247, lng: -73.9178987},
            disableDefaultUI: true,
            styles: mapStyles
        });

        this.constructEventWindow();

        render(
            <div>
                <MapComponents
                    map={this.map}
                    eventDOM={this.eventDOM}
                    eventWindow={this.eventWindow} />
                </div>
            , document.getElementById('mapFinished'));
    }

    render() {
        return (
            <div id="mapCSSWrapper">
                <div id="mapContainer" />
                <div id="mapFinished" />
            </div>
        );
    }
}