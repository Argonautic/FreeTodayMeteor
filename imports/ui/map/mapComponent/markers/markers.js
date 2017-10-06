import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import ViewEvent from './viewEvent';

class Markers extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.eventUpdatedOrDeleted = this.eventUpdatedOrDeleted.bind(this);
    }

    eventUpdatedOrDeleted() {
        this.eventWindow.close();
    }

    render() {
        this.markers.forEach(marker => {
            marker.setMap(null);
            google.maps.event.clearListeners(marker, 'click');
        });
        this.markers = [];

        if (this.props.map.getZoom() > 10) {
            this.props.allEvents.forEach(event => {

                //Convert GeoJSON to google maps format LatLng
                let coordinates = event.eventLocation.location.coordinates;
                let latLng = new google.maps.LatLng(coordinates[1], coordinates[0]);

                let marker = new google.maps.Marker({
                    map: this.props.map,
                    position: latLng,
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

                    this.props.eventWindow.setPosition(latLng);
                    this.props.eventWindow.open(this.props.map);
                });
                this.markers.push(marker);
            });
        }

        return null
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('events.all-public-events');
    const currentUser = Meteor.user();

    return {
        ready: handle.ready(),
        allEvents: Events.find({}).fetch(),
        currentUser,
    };
})(Markers);