import React, { Component } from 'react';
import { render } from 'react-dom';

import MapComponents from './mapComponents/mapComponents'
import mapStyles from './mapStyles';

import '/public/style/map';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.constructEventWindow = this.constructEventWindow.bind(this);
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