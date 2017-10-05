import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

import '/public/style/searchbar.css';

export default class Searchbar extends Component {
    render() {
        return (
            <div>
                <Search id="searchbar" fluid />
            </div>
        )
    }
}