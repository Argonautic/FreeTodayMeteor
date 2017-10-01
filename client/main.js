import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/api/client/collections';
import App from '../imports/ui/app';

Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'))
})