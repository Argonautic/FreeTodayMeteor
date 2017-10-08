import React, { Component } from 'react';
import { Button, Divider } from 'semantic-ui-react';

import ViewEventForm from './viewEventForm';
import EditEventForm from './editEventForm';

export default class ViewEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: this.props.currentUser === this.props.event.owner
        };

        this.renderEditButton = this.renderEditButton.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    renderEditButton() {
        if (this.props.currentUser === this.props.event.owner) {
            return <Button onClick={this.toggleEditing}>
                {this.state.editing ? "View Event" : "Edit Event"}
            </Button>
        }
    }

    toggleEditing() {
        this.setState({ editing: !this.state.editing });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ editing: nextProps.currentUser === nextProps.event.owner });
    }

    render() {
        return (
            <div>
                {this.renderEditButton()}
                <Divider />
                {!this.state.editing ?
                    <ViewEventForm event={this.props.event} /> :
                    <EditEventForm
                        marker={this.props.marker}
                        event={this.props.event}
                        eventUpdatedOrDeleted={this.props.eventUpdatedOrDeleted}
                    />
                }
            </div>
        );
    }
}