import React, { Component } from 'react';
import { render } from 'react-dom';

import NewEventForm from './newEventForm';

export default class NewEvent extends Component {
    constructor(props) {
        super(props);

        this.createNewEventWindow = this.createNewEventWindow.bind(this);
        this.newEventSubmitted = this.newEventSubmitted.bind(this);

        this.props.map.addListener('rightclick', this.createNewEventWindow);
    }

    newEventSubmitted() {
        this.props.eventWindow.close();
    }

    createNewEventWindow(event) {
        eventLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        const newEventForm = Meteor.userId() ?
            <NewEventForm eventLocation={eventLocation} newEventSubmitted={this.newEventSubmitted}/> :
            <h3>Login to make a new Event!</h3>;
        render(newEventForm, this.props.eventDOM);

        this.props.eventWindow.setPosition(eventLocation);
        this.props.eventWindow.open(this.props.map);
    }

    render() {
        return null
    }
}