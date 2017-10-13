import React, { Component } from 'react';
import { Item, Divider, Button } from 'semantic-ui-react';

import { signupForEvent } from '../../../../api/events/events';

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

        this.renderSignupButton = this.renderSignupButton.bind(this);
        this.signup = this.signup.bind(this);
    }

    renderSignupButton() {
        if (this.props.currentUserId !== this.props.event.owner._id) {
            return <Button primary onClick={this.signup}>I'm In!</Button>
        }
    }

    signup() {
        signupForEvent.call(this.props.event._id, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("You're in!");
            }
        });
    }

    render() {
        const { event } = this.props;

        const startDateString = this.props.event.eventDates.startDate.toLocaleDateString([], this.dateFormat);
        const endDateString = this.props.event.eventDates.endDate.toLocaleDateString([], this.dateFormat);

        return (
            <div className="viewEventWindow">
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" src={event.owner.profile.picture} /><br/>

                        <Item.Content id="item-content">
                            <Item.Header>{event.eventName}</Item.Header>
                            <Item.Meta>Host: {event.owner.profile.name}</Item.Meta>
                            <Item.Description>
                                <div>
                                    <p>{event.eventDescription}</p><br />
                                    <p><strong>Start Date: </strong>{startDateString}</p><br />
                                    <p><strong>End Date: </strong>{endDateString}</p><br />
                                </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

                <Divider />
                {this.renderSignupButton()}
            </div>
        );
    }
}