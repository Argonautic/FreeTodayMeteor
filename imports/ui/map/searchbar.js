import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushCoordinates } from '../redux/actions/index';
import { Search } from 'semantic-ui-react';

import '/public/style/searchbar.css';

class Searchbar extends Component {
    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(nextProps) {
        map = nextProps.map;

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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ pushCoordinates }, dispatch);
}

function mapStateToProps({ map }) {
    return { map };
}

export default connect(mapStateToProps)(Searchbar);