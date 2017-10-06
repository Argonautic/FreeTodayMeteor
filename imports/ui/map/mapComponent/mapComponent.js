import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Markers from './markers/markers';
import NewEvent from './newEvent/newEvent';
import { pushMap } from '../../redux/actions/index';

import '/public/style/mapComponent.css';

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.constructEventWindow = this.constructEventWindow.bind(this);
    }

    constructEventWindow() {
        this.eventDOM = document.createElement('div');
        this.eventWindow = new google.maps.InfoWindow({ content: this.eventDOM });
    }

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('mapContainer'), {
            zoom: 15,
            center: this.props.center
        });
        this.props.pushMap(this.map);

        this.constructEventWindow();

        render(
            <div>
                <Markers map={this.map} eventDOM={this.eventDOM} eventWindow={this.eventWindow}/>
                <NewEvent map={this.map} eventDOM={this.eventDOM} eventWindow={this.eventWindow}/>
            </div>, document.getElementById('mapFinished'));
    }

    render() {
        return (
            <div id="mapFinished" />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ pushMap }, dispatch);
}

function mapStateToProps({ map }) {
    return { map };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);