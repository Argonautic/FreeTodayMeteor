import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

export default class NewEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            eventDescription: '',
            success: false,
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        this.props.newEventSubmitted(this.state.eventName, this.state.eventDescription);
    }

    render() {
        return (
            <div>
                <h3>New Event</h3>
                <Form success={this.state.success} error={this.state.error} onSubmit={this.onSubmit}>
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
                    <Form.Button content="Submit" />
                </Form>
            </div>
        );
    }
}