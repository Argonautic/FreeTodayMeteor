import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Item, Divider, Button, Loader, Image, Popup } from 'semantic-ui-react';

import { signupForEvent } from '../../../../api/events/events';

import '/public/style/viewEventForm.css';

class ViewEventForm extends Component {
    constructor(props) {
        super(props);

        this.dateFormat = {
            weekday: 'long',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute:'2-digit'
        };

        this.renderParticipants = this.renderParticipants.bind(this);
        this.renderSignupButton = this.renderSignupButton.bind(this);
        this.signup = this.signup.bind(this);
    }

    renderParticipants() {
        return !this.props.ready ? <Loader /> :
            <div>
                <p>There are <strong>{this.props.eventParticipants.length}</strong> participants</p>
                <Image.Group size="mini">
                    {this.props.eventParticipants.map((participant) => {
                        return <Popup
                                key={participant._id}
                                inverted
                                size="mini"
                                trigger={<Image src={participant.profile.picture}/>}
                                content={participant.profile.name}
                            />
                    })}
                </Image.Group>
            </div>
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
                                    <p><strong>Start Date: </strong>{startDateString}</p>
                                    <p><strong>End Date: </strong>{endDateString}</p>
                                </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>

                <Divider />
                {this.renderParticipants()}
                {this.renderSignupButton()}
            </div>
        );
    }
}

export default withTracker((props) => {
    const handle = Meteor.subscribe('users.participants-for-event', props.event.eventParticipants);

    return {
        ready: handle.ready(),
        eventParticipants: Meteor.users.find({}).fetch()
    };
})(ViewEventForm);