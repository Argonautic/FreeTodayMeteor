import React, { Component } from 'react';
import { render } from 'react-dom';

import NewEventForm from './subcomponents/newEventForm';
import ViewEvent from './subcomponents/viewEvent';

import '/public/style/mapComponent.css';

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.constructEventWindow = this.constructEventWindow.bind(this);
        this.createNewEventWindow = this.createNewEventWindow.bind(this);

        this.newEventSubmitted = this.newEventSubmitted.bind(this);
        this.eventUpdatedOrDeleted = this.eventUpdatedOrDeleted.bind(this);

        this.renderEventMarkers = this.renderEventMarkers.bind(this);
    }


    constructEventWindow() {
        this.eventDOM = document.createElement('div');
        this.eventWindow = new google.maps.InfoWindow({ content: this.eventDOM });
    }

    createNewEventWindow(event) {
        eventPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        const newEventForm = this.props.currentUser ?
            <NewEventForm eventPosition={eventPosition} newEventSubmitted={this.newEventSubmitted}/> :
            <h3>Login to make a new Event!</h3>;
        render(newEventForm, this.eventDOM);

        this.eventWindow.setPosition(eventPosition);
        this.eventWindow.open(this.map);
    }

    newEventSubmitted() {
        this.eventWindow.close();
    }


    eventUpdatedOrDeleted() {
        this.eventWindow.close();
    }

    renderEventMarkers() {
        //unsure if this part is necessary
        this.markers.forEach(marker => {
            marker.setMap(null);
            google.maps.event.clearListeners(marker, 'click');
        });
        this.markers = [];

        if (this.map.getZoom() > 10) {
            this.props.allEvents.forEach(event => {
                let marker = new google.maps.Marker({
                    map: this.map,
                    position: event.eventPosition,
                    title: event.eventName,
                    icon: this.props.currentUser && event.owner === this.props.currentUser._id ?
                        '/images/gold-marker-15.svg' :
                        '/images/green-marker-15.svg',
                });

                //Do these listeners persist across re-renders?
                marker.addListener('click', () => {
                    let viewEventForm = <ViewEvent
                        marker={marker}
                        event={event}
                        currentUser={this.props.currentUser}
                        eventUpdatedOrDeleted={this.eventUpdatedOrDeleted}
                    />;
                    render(viewEventForm, this.eventDOM);

                    this.eventWindow.setPosition(event.eventPosition);
                    this.eventWindow.open(this.map);
                });
                this.markers.push(marker);
            });

            console.log('markers rendered!');
        }
    }

    componentDidUpdate() {
        this.renderEventMarkers();
    }

    componentWillMount() {
        console.log('the map element is:' + document.getElementById('map'));

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.props.center
        });

        this.constructEventWindow();
        this.renderEventMarkers();

        this.map.addListener('rightclick', this.createNewEventWindow);
        this.map.addListener('dragend', this.renderEventMarkers);
        this.map.addListener('zoom_changed', this.renderEventMarkers);
    }

    render() {
        return (
            <div />
        );
    }
}