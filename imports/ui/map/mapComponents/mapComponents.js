import React, { Component } from 'react';
import { render } from 'react-dom';

import Markers from './existingEvents/markers';
import NewEvent from './newEvents/newEvent';
import Searchbar from './searchbar/searchbar';

import '/public/style/mapComponents.css';

export default class MapComponents extends Component {
    constructor(props) {
        super(props);

        const googleLatLng = this.props.map.center;
        const centerCoordinates = [googleLatLng.lng(), googleLatLng.lat()]

        this.state = {
            centerCoordinates
        };

        this.changeMapCenter = this.changeMapCenter.bind(this);
    }

    changeMapCenter(newCenter) {
        this.setState({ centerCoordinates: newCenter })
    }

    render() {
        const eventDOM = this.props.eventDOM;
        const eventWindow = this.props.eventWindow;
        const map = this.props.map;

        return (
            <div>
                <Markers map={map} eventDOM={eventDOM} eventWindow={eventWindow} centerCoordinates={this.state.centerCoordinates} />
                <NewEvent map={map} eventDOM={eventDOM} eventWindow={eventWindow} />
                <Searchbar map={map} changeMapCenter={this.changeMapCenter} />
            </div>
        );
    }
}