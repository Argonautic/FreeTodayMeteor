import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { render } from 'react-dom';

import ViewEvent from './viewEvent';

class Markers extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.eventUpdatedOrDeleted = this.eventUpdatedOrDeleted.bind(this);
    }

    eventUpdatedOrDeleted() {
        this.props.eventWindow.close();
    }

    render() {
        this.markers.forEach(marker => {
            marker.setMap(null);
            google.maps.event.clearListeners(marker, 'click');
        });
        this.markers = [];

        if (this.props.map.getZoom() > 10) {
            this.props.eventsAroundSearch.forEach(event => {

                //Convert GeoJSON to google maps format LatLng
                let coordinates = event.eventLocation.location.coordinates;
                let latLng = new google.maps.LatLng(coordinates[1], coordinates[0]);

                let marker = new google.maps.Marker({
                    map: this.props.map,
                    position: latLng,
                    title: event.eventName,
                    icon: this.props.currentUser && event.owner === this.props.currentUser ?
                        '/images/gold-marker-15.svg' :
                        '/images/green-marker-15.svg',
                });

                marker.addListener('click', () => {
                    let viewEventForm = <ViewEvent
                        marker={marker}
                        event={event}
                        currentUser={this.props.currentUser}
                        eventUpdatedOrDeleted={this.eventUpdatedOrDeleted}
                    />;
                    render(viewEventForm, this.props.eventDOM);

                    this.props.eventWindow.setPosition(latLng);
                    this.props.eventWindow.open(this.props.map);
                });
                this.markers.push(marker);
            });
        }

        return null
    }
}

export default withTracker((props) => {
    const handle = Meteor.subscribe('events.events-around-search', props.centerCoordinates);
    const currentUser = Meteor.userId();

    return {
        ready: handle.ready(),
        eventsAroundSearch: Events.find({}).fetch(),
        currentUser,
    };
})(Markers);