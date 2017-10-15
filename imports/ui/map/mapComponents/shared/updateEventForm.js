import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Form, Input, TextArea, Button, Message } from 'semantic-ui-react';

import { submitNewEvent } from '../../../../api/events/events';
import { deleteEvent } from '../../../../api/events/events';
import { updateEvent } from '../../../../api/events/events';

import 'react-datepicker/dist/react-datepicker.css';

export default class UpdateEventForm extends Component {
    constructor(props) {
        super(props);

        // Pretty hacky
        const event = props.event || { eventDates: {}};

        this.state = {
            eventName: event.eventName || '',
            eventDescription: event.eventDescription || '',
            startDate: moment(event.eventDates.startDate) || '',
            endDate: moment(event.eventDates.endDate) || '',
            error: false,
            errorContent: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.checkValues = this.checkValues.bind(this);
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
                this.checkValues();
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
                console.log(err);
                console.log(`ERROR(${err.code}): ${err.message}`)
                this.checkValues();
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

    checkValues() {
        const errorMessages = [];

        if (this.state.eventName.length < 3 || this.state.eventName.length > 50) {
            errorMessages.push(<li>Event Name must be between 3 and 50 characters</li>);
        } if (this.state.eventDescription.length > 500) {
            errorMessages.push(<li>Event Description must be under 500 characters</li>);
        } if (this.state.startDate < new Date()) {
            errorMessages.push(<li>Start Date must be a valid date</li>)
        } if (this.state.endDate < this.state.startDate) {
            errorMessages.push(<li>End Date must be a valid date and after Start Date</li>)
        }

        this.setState({
            error: true,
            errorContent: <ul>{errorMessages}</ul>
        });
    }

    renderActionButtons() {
        if (this.props.isNewEvent) {
            return <Form.Button primary content="Submit" onClick={this.onSubmit} />
        } else {
            return <Button.Group>
                <Form.Button primary content="Submit" onClick={this.onUpdate} />
                <Button.Or />
                <Button negative onClick={this.onDelete}>Delete</Button>
            </Button.Group>
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
                {this.props.isNewEvent && <h3>New Event</h3>}
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
                            dateFormat="LLL"
                            minDate={moment()}
                            maxDate={moment().add(28, 'days')}
                            selected={this.state.startDate}
                            onChange={this.onStartDateChange}

                            popperPlacement="top-end"
                            popperModifiers={{
                                    offset: {enabled: false}
                            }}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>End Date</label>
                        <DatePicker
                            showTimeSelect
                            dateFormat="LLL"
                            minDate={moment()}
                            maxDate={moment().add(28, 'days')}
                            selected={this.state.endDate}
                            onChange={this.onEndDateChange}

                            popperPlacement="top-end"
                            popperModifiers={{
                                    offset: {enabled: false}
                            }}
                        />
                    </Form.Field>
                    {this.state.error && <Message error header="Form Error" content={this.state.errorContent} />}
                    {this.renderActionButtons()}
                </Form>
            </div>
        );
    }
}