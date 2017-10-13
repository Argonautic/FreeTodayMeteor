import React, { Component } from 'react';

export default class EventMarker extends Component {
    render() {
        const event = this.props.event;

        const marker = new google.maps.Marker({
            map: this.props.map,
            position: event.eventPosition,
            title: event.eventName,
            animation: google.maps.Animation.DROP,
            icon: '/images/green-marker-15.svg'
        });
    }
}