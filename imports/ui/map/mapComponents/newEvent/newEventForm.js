import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Input, TextArea, Message } from 'semantic-ui-react';

import { submitNewEvent } from '../../../../api/events/events';

import 'react-datepicker/dist/react-datepicker.css';

export default class NewEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            eventDescription: '',
            startDate: '',
            endDate: '',
            success: false,
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
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

    onStartDateChange(date) {
        this.setState({ startDate: date });
    }

    onEndDateChange(date) {
        this.setState({ endDate: date });
    }

    onSubmit() {
        const coordinates = [this.props.eventLocation.lng, this.props.eventLocation.lat];

        const newEvent = {
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            startDate: moment(this.state.startDate).toDate(),
            endDate: moment(this.state.endDate).toDate(),
            eventLocation: {
                location: {
                    coordinates
                }
            }
        };

        submitNewEvent.call(newEvent, (err) => {
            if (err) {
                console.log(`ERROR(${err.code}): ${err.message}`)
            } else {
                this.props.newEventSubmitted();
                this.setState({
                    eventName: '',
                    eventDescription: '',
                    stateDate: '',
                    endDate: ''
                });
            }
        });
    }

    render() {
        return (
            <div className="editEventWindow">
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
                    <Form.Field required>
                        <label>Start Date</label>
                        <DatePicker
                            showTimeSelect
                            className="startDate"
                            minDate={moment()}
                            maxDate={moment().add(14, 'days')}
                            selected={this.state.startDate}
                            onChange={this.onStartDateChange}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>End Date</label>
                        <DatePicker
                            showTimeSelect
                            minDate={moment()}
                            maxDate={moment().add(14, 'days')}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChange}
                        />
                    </Form.Field>
                    <Message error header="Form Error" />
                    <Form.Button primary content="Submit" />
                </Form>
            </div>
        );
    }
}