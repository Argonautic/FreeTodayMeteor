import React, { Component } from 'react';
import { render } from 'react-dom';

import NewEventForm from './subcomponents/newEventForm';
//import { Events } from '../../../api/events/events';
import { submitNewEvent } from '../../../api/events/events';

import '/public/style/map.css';

export default class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEventPos: null
        };

        this.moveNewEventWindow = this.moveNewEventWindow.bind(this);
        this.createNewEventWindow = this.createNewEventWindow.bind(this);
        this.newEventSubmitted = this.newEventSubmitted.bind(this);
        this.renderMarkers = this.renderMarkers.bind(this);
    }

    moveNewEventWindow(event) {
        if (!this.props.currentUser) {
            render(<h3>Login to make a new Event!</h3>, this.detachedDOM);
        }

        const eventCenter = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        this.newEventWindow.setPosition(eventCenter);
        this.setState({ newEventPos: eventCenter });
        this.newEventWindow.open(this.map);
    }

    createNewEventWindow() {
        this.detachedDOM = document.createElement('div');
        this.newEventWindow = new google.maps.InfoWindow({ content: this.detachedDOM });

        const newEventForm = <NewEventForm newEventSubmitted={this.newEventSubmitted}/>;
        render(newEventForm, this.detachedDOM);
    }

    newEventSubmitted(eventName, eventDescription) {
        const newEvent = {
            eventName: eventName,
            eventDescription: eventDescription,
            eventPosition: this.state.newEventPos,
        };

        submitNewEvent.validate(newEvent);
        submitNewEvent.call(newEvent, (err) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`)
            } else {
                console.log('success!');
            }
        });

        this.newEventWindow.close();
    }

    renderMarkers() {
        console.log(this.props.myEvents)
    }

    componentDidMount() {
        const center = this.props.center || {lat: 40.760262, lng: -73.919362};

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.props.center || {lat: 40.760262, lng: -73.919362}
        });

        /*const marker = new google.maps.Marker({
            position: center,
            map: this.map
        });*/

        this.createNewEventWindow();
        this.renderMarkers();

        this.map.addListener('rightclick', this.moveNewEventWindow);
    }

    render() {
        return (
            <div id="map"/>
        );
    }
}

/*export default trackedMap = withTracker(() => {
    const handle = Meteor.subscribe('events.my-events');
    console.log(handle);
    const currentUser = Meteor.user();

    return {
        ready: handle.ready(),
        myEvents: Events.find({}).fetch(),
        currentUser,
    };
})(MapComponent);*/