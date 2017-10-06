import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

import { deleteEvent } from '../../../api/events/events';
import { updateEvent } from '../../../api/events/events';

export default class EditEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: this.props.event.eventName,
            eventDescription: this.props.event.eventDescription,
            success: false,
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        const updatedEvent = {
            owner: this.props.event.owner._id,
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventLocation: this.props.event.eventLocation
        };
        console.log(updatedEvent);

        updateEvent.call({eventId: this.props.event._id, updatedEvent}, (err) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`);
            } else {
                console.log('event updated!');
                this.props.eventUpdatedOrDeleted();
            }
        });
    }

    onDelete() {
        deleteEvent.call(this.props.event._id, (err) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`);
            } else {
                this.props.marker.setMap(null);
                google.maps.event.clearListeners(this.props.marker, 'click');

                this.props.eventUpdatedOrDeleted();
                console.log('event deleted!');
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            eventName: nextProps.event.eventName,
            eventDescription: nextProps.event.eventDescription
        })
    }

    render() {
        return (
            <div>
                <Form success={this.state.success} error={this.state.error}>
                    <Form.Field
                        value={this.state.eventName}
                        onChange={this.onChange}
                        name="eventName"
                        label="Event Name (max: 50 chars)"
                        placeholder="Event Name"
                        control={Input}
                        max="50"
                        required
                    />
                    <Form.Field
                        value={this.state.eventDescription}
                        onChange={this.onChange}
                        name="eventDescription"
                        label="Event Description (max: 250 chars)"
                        placeholder="Event Description"
                        control={TextArea}
                        maxLength="250"
                    />
                    <Message error header="Form Error" />
                    <Button.Group>
                        <Form.Button primary content="Submit" onClick={this.onSubmit} />
                        <Button.Or text="" />
                        <Button negative onClick={this.onDelete}>Delete</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}