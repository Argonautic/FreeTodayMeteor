import React, { Component } from 'react';
import { Item, Header } from 'semantic-ui-react';

export default class ViewEventForm extends Component {
    componentDidMount() {
        console.log(this.props.event.startDate)
    }

    render() {
        return (
            <div className="viewEventWindow">
                <Item>
                    <Item.Content>
                        <Header>{this.props.event.eventName}</Header>
                        <Item.Description>
                            <div>
                                {this.props.event.eventDescription}
                            </div>
                        </Item.Description>
                    </Item.Content>
                </Item>
            </div>
        );
    }
}