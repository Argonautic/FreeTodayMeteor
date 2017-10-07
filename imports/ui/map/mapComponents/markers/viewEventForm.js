import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

export default class ViewEvent extends Component {
    render() {
        return (
            <Item>
                <Item.Content>
                    <Item.Header>{this.props.event.eventName}</Item.Header>
                    <Item.Description>{this.props.event.eventDescription}</Item.Description>
                </Item.Content>
            </Item>
        );
    }
}