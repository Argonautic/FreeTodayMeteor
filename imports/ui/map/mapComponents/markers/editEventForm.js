import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

import { deleteEvent } from '../../../../api/events/events';
import { updateEvent } from '../../../../api/events/events';

export default class EditEventForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: this.props.event.eventName,
            eventDescription: this.props.event.eventDescription,
            startDate: moment(this.props.event.startDate),
            endDate: moment(this.props.event.endDate),
            success: false,
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
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

    onStartDateChange(date) {
        this.setState({ startDate: date });
    }

    onEndDateChange(date) {
        this.setState({ endDate: date });
    }

    onSubmit() {
        const updatedEvent = {
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventDates: {
                startDate: moment(this.state.startDate).toDate(),
                endDate: moment(this.state.endDate).toDate()
            },
            eventLocation: this.props.event.eventLocation
        };

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
            <div className="editEventWindow">
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
                            maxDate={moment().add(28, 'days')}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChange}
                        />
                    </Form.Field>
                    <Message error header="Form Error" />
                    <Button.Group>
                        <Form.Button primary content="Submit" onClick={this.onSubmit} />
                        <Button.Or />
                        <Button negative onClick={this.onDelete}>Delete</Button>
                    </Button.Group>
                </Form>
            </div>
        );
    }
}