import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { render } from 'react-dom';

import ViewEvent from './viewEvent';

class Markers extends Component {
    constructor(props) {
        super(props);

        this.markers = [];

        this.eventUpdated = this.eventUpdated.bind(this);
    }

    eventUpdated() {
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
                    icon: this.props.currentUserId && event.owner._id === this.props.currentUserId ?
                        'images/map-marker1.png' :
                        'images/map-marker2.png'
                });

                marker.addListener('click', () => {
                    let viewEventForm = <ViewEvent
                        marker={marker}
                        event={event}
                        currentUserId={this.props.currentUserId}
                        eventUpdated={this.eventUpdated}
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
    const currentUserId = Meteor.userId();

    return {
        ready: handle.ready(),
        eventsAroundSearch: Events.find({}).fetch(),
        currentUserId,
    };
})(Markers);