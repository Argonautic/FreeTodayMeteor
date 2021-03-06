import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';

import ViewEventForm from './viewEventForm';
import UpdateEventForm from '../shared/updateEventForm';

export default class ViewEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: this.props.currentUserId === this.props.event.owner._id
        };

        this.renderEditButton = this.renderEditButton.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    renderEditButton() {
        if (this.props.currentUserId === this.props.event.owner._id) {
            return <Button onClick={this.toggleEditing}>
                {this.state.editing ? "View Event" : "Edit Event"}
            </Button>
        }
    }

    toggleEditing() {
        this.setState({ editing: !this.state.editing });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ editing: nextProps.currentUserId === nextProps.event.owner._id });
    }

    render() {
        return (
            <div>
                {this.renderEditButton()}
                <Divider />
                {!this.state.editing ?
                    <ViewEventForm
                        event={this.props.event}
                        eventUpdated={this.props.eventUpdated}
                        currentUserId={this.props.currentUserId} /> :
                    <UpdateEventForm
                        marker={this.props.marker}
                        event={this.props.event}
                        eventUpdated={this.props.eventUpdated} />
                }
            </div>
        );
    }
}