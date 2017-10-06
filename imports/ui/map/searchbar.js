import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';

import '/public/style/searchbar.css';

export default class Searchbar extends Component {
    componentDidMount() {
        console.log('Searchbar did mount');
    }

    render() {
        return (
            <div>
                <Search id="searchbar" fluid />
            </div>
        )
    }
}