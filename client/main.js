import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import '../imports/startup/client/index';
import App from '../imports/ui/app';
import reducers from '../imports/ui/redux/reducers';
import ReduxPromise from 'redux-promise';

createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
export const appStore = createStoreWithMiddleware(reducers);

Meteor.startup(() => {
    render(
        <Provider id="store" store={appStore}>
            <App />
        </Provider>,
        document.getElementById('render-target'))
});