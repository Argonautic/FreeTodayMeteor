import React, { Component } from 'react';
import { render } from 'react-dom';

import NewEventForm from './subcomponents/newEventForm';
import EventMarker from './subcomponents/eventMarker';
import { submitNewEvent } from '../../api/events/events';
import { deleteEvent } from '../../api/events/events';

import '/public/style/mapComponent.css';

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: this.props.center
        };

        this.moveNewEventWindow = this.moveNewEventWindow.bind(this);
        this.createNewEventWindow = this.createNewEventWindow.bind(this);
        this.newEventSubmitted = this.newEventSubmitted.bind(this);
        this.renderEventMarkers = this.renderEventMarkers.bind(this);
    }


    createNewEventWindow() {
        this.detachedDOM = document.createElement('div');
        this.newEventWindow = new google.maps.InfoWindow({ content: this.detachedDOM });

        const newEventForm = <NewEventForm newEventSubmitted={this.newEventSubmitted}/>;
        render(newEventForm, this.detachedDOM);
    }

    moveNewEventWindow(event) {
        if (!this.props.currentUser) {
            render(<h3>Login to make a new Event!</h3>, this.detachedDOM);
        }

        this.eventCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        this.newEventWindow.setPosition(this.eventCenter);
        this.newEventWindow.open(this.map);
    }

    newEventSubmitted(eventName, eventDescription) {
        const newEvent = {
            eventName: eventName,
            eventDescription: eventDescription,
            eventPosition: this.eventCenter
        };

        submitNewEvent.call(newEvent, (err) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`)
            } else {
                console.log('success!');
            }
        });

        this.newEventWindow.close();
    }


    renderEventMarkers() {
        this.props.allEvents.forEach(event => {
            let marker = new google.maps.Marker({
                map: this.map,
                position: event.eventPosition,
                title: event.eventName,
                icon: event.owner === this.props.currentUser._id ? '/images/gold-marker-15.svg' : '/images/green-marker-15.svg',
            });

            //Do these listeners persist across re-renders?
            marker.addListener('click', () => {
                deleteEvent.call(event._id);
                marker.setMap(null);
            })
        });
    }

    componentDidUpdate() {
        console.log('component updated');
        this.renderEventMarkers();
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.props.center || {lat: 40.760262, lng: -73.919362}
        });

        this.createNewEventWindow();
        this.renderEventMarkers();

        this.map.addListener('rightclick', this.moveNewEventWindow);
        this.map.addListener('dragend', this.renderEventMarkers);
    }

    render() {
        return (
            <div id="map" />
        );
    }
}