import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { render } from 'react-dom';

import NewEventForm from './subcomponents/newEventForm';

import '/public/style/map.css';

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newEventPos: null
        };

        this.moveNewEventWindow = this.moveNewEventWindow.bind(this);
        this.createNewEventWindow = this.createNewEventWindow.bind(this);
        this.newEventSubmitted = this.newEventSubmitted.bind(this);
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
        console.log(eventName);
        console.log(eventDescription);

        Meteor.call('submitNewEvent', (err, res) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`)
            } else {
                console.log(res);
            }
        });

        this.newEventWindow.close();
    }

    componentDidMount() {
        const center = this.props.center || {lat: 40.760262, lng: -73.919362};

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.props.center || {lat: 40.760262, lng: -73.919362}
        });

        const marker = new google.maps.Marker({
            position: center,
            map: this.map
        });

        this.createNewEventWindow();
        this.map.addListener('rightclick', this.moveNewEventWindow);
    }

    render() {
        return (
            <div id="map"/>
        );
    }
}


export default trackedMap = withTracker(() => {
    const currentUser = Meteor.user();
    const userName = currentUser && currentUser.profile.name;

    return {
        currentUser,
        userName
    };
})(MapComponent);