import React, { Component } from 'react';

import '/public/style/searchbar.css';

export default class Searchbar extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        map = this.props.map;

        const input = document.getElementById('searchTextField');
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

        map.addListener('bounds_changed', () => {
            searchBox.setBounds(map.getBounds());
        });

        searchBox.addListener('places_changed', () => {
            data = searchBox.getPlaces();
            coordinateData = data[0].geometry.location;
            lat = coordinateData.lat();
            lng = coordinateData.lng();

            map.setCenter({lat, lng});
            this.props.changeMapCenter([lng, lat]);
        });
    }

    render() {
        return (
            <input
                id="searchTextField"
                type="text"
                placeholder="Pick Your Neighborhood"
            />
        )
    }
}