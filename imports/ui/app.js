import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header/header';
import Map from './map/map';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route component={Header} />
                    <Route exact path="/" component={Map} />
                </div>
            </BrowserRouter>
        )
    }
}