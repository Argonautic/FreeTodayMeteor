import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

import { submitNewEvent } from '../../../../api/events/events';
import { deleteEvent } from '../../../../api/events/events';
import { updateEvent } from '../../../../api/events/events';

import 'react-datepicker/dist/react-datepicker.css';

export default class EventForm extends Component {
    constructor(props) {
        super(props);

        // This is the hackiest thing I've ever seen. Need to break
        // up this form even more while maintaining React Form state
        const event = props.event || { eventDates: {}};

        this.state = {
            eventName: event.eventName || '',
            eventDescription: event.eventDescription || '',
            startDate: moment(event.eventDates.startDate) || '',
            endDate: moment(event.eventDates.endDate) || '',
            success: false,
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.renderActionButtons = this.renderActionButtons.bind(this);
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
            owner: Meteor.user(),
            eventName: this.state.eventName,
            eventDescription: this.state.eventDescription,
            eventDates: {
                startDate: moment(this.state.startDate).toDate(),
                endDate: moment(this.state.endDate).toDate(),
            },
            eventLocation: {
                location: {
                    coordinates
                }
            }
        };

        submitNewEvent.call(newEvent, (err) => {
            if (err) {
                console.log(err);
                console.log(`ERROR(${err.code}): ${err.message}`)
            } else {
                this.props.newEventSubmitted();
            }
        });
    }

    onUpdate() {
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
                this.props.eventUpdated('Event Updated!');
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

                this.props.eventUpdated('Event Deleted', 'warning');
            }
        });
    }

    renderActionButtons() {
        if (this.props.update) {
            return <Button.Group>
                <Form.Button primary content="Submit" onClick={this.onUpdate} />
                <Button.Or />
                <Button negative onClick={this.onDelete}>Delete</Button>
            </Button.Group>
        } else {
            return <Form.Button primary content="Submit" onClick={this.onSubmit} />
        }
    }

    componentWillReceiveProps(nextProps) {
        const event = nextProps.event || { eventDates: {} };

        this.setState({
            eventName: event.eventName || '',
            eventDescription: event.eventDescription || '',
            startDate: moment(event.eventDates.startDate) || '',
            endDate: moment(event.eventDates.endDate) || '',
            success: false,
            error: false
        })
    }

    render() {
        return (
            <div className="editEventWindow">
                {this.props.update || <h3>New Event</h3>}
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
                            openToDate={this.state.startDate}
                            dateFormat="LLL"
                            className="startDate"
                            minDate={moment()}
                            maxDate={moment().add(28, 'days')}
                            selected={this.state.startDate}
                            onChange={this.onStartDateChange}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>End Date</label>
                        <DatePicker
                            showTimeSelect
                            openToDate={this.state.endDate}
                            dateFormat="LLL"
                            minDate={moment()}
                            maxDate={moment().add(28, 'days')}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChange}
                        />
                    </Form.Field>
                    <Message error header="Form Error" />
                    {this.renderActionButtons()}
                </Form>
            </div>
        );
    }
}