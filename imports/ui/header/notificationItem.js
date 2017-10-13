import React, { Component } from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

export default class NotificationItem extends Component {
    constructor(props){
        super(props);

        this.onHover = this.onHover.bind(this);
    }

    onHover() {
        this.props.onHover(this.props.notification._id);
    }

    render() {
        const { notification } = this.props;
        const style = notification.active ? {'color': 'red'} : {};

        return (
            <Dropdown.Item
                key={notification._id}
                icon={<Icon name="bell outline" style={style}/>}
                text={notification.content}
                onMouseEnter={this.onHover}
            />
        )
    }
}