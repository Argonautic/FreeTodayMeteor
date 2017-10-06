import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import '../imports/startup/client/index';
import App from '../imports/ui/app';
import reducers from '../imports/ui/redux/reducers';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

Meteor.startup(() => {
    render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <App />
        </Provider>,
        document.getElementById('render-target'))
});