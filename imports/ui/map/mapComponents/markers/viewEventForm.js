import React, { Component } from 'react';
import { Item, Header } from 'semantic-ui-react';

export default class ViewEventForm extends Component {
    constructor(props) {
        super(props);

        this.dateFormat = {
            weekday: 'long',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute:'2-digit'
        };
    }

    render() {
        const startDateString = this.props.event.startDate.toLocaleDateString([], this.dateFormat);
        const endDateString = this.props.event.endDate.toLocaleDateString([], this.dateFormat);

        return (
            <div className="viewEventWindow">
                <Item>
                    <Item.Content>
                        <Header as="h3">{this.props.event.eventName}</Header>
                        <Item.Description>
                            <div>
                                <p>{this.props.event.eventDescription}</p><br />
                                <p><strong>Start Date: </strong>{startDateString}</p><br />
                                <p><strong>End Date: </strong>{endDateString}</p><br />
                            </div>
                        </Item.Description>
                    </Item.Content>
                </Item>
            </div>
        );
    }
}