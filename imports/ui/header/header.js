import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Menu, Button, Icon, Dropdown, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import NotificationItem from './notificationItem';
import { notificationSeen } from '../../api/notifications/notifications';

import '/public/style/header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.renderLogins = this.renderLogins.bind(this);
        this.renderNotifications = this.renderNotifications.bind(this);
        this.onNotificationHover = this.onNotificationHover.bind(this);
    }

    renderLogins() {
        if (!this.props.currentUser) {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button color="facebook" onClick={this.facebookLogin}>
                            <Icon name="facebook" /> Login
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button color="twitter" onClick={this.twitterLogin}>
                            <Icon name="twitter" /> Login
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            )
        } else {
            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Dropdown icon='bell outline'>
                            <Dropdown.Menu>
                                {this.renderNotifications()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown text={this.props.userName}>
                            <Dropdown.Menu>
                                <Dropdown.Item text="Logout" onClick={this.logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu.Menu>
            );
        }
    }

    renderNotifications() {
        if (!this.props.ready) {
            return <Loader />
        } else if (this.props.myNotifications.length === 0) {
            return <Dropdown.Item text="No Notifications" />
        } else {
            return this.props.myNotifications.reverse().map((notification) => {
                return <NotificationItem notification={notification} onHover={this.onNotificationHover} />
            });
        }
    }

    onNotificationHover(notificationId) {
        notificationSeen.call({notificationId}, (err) => {
            console.log(err);
        });
    }

    facebookLogin() {
        const options = { requestPermissions: ['email', 'public_profile'], loginStyle: 'redirect' };

        Meteor.loginWithFacebook(options, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    twitterLogin() {
        const options = { loginStyle: 'redirect' };

        Meteor.loginWithTwitter(options, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    logout() {
        Meteor.logout((error) => {
            if (error) {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <Menu id="menu" inverted>
                <Menu.Item name="FreeToday" >
                    <Link to="/">
                        <h3>FreeToday</h3>
                    </Link>
                </Menu.Item>
                {this.renderLogins()}
            </Menu>
        )
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('notifications.my-notifications');
    const ready = handle.ready();
    const currentUser = Meteor.user();
    const userName = currentUser && currentUser.profile.name;

    return {
        ready,
        currentUser,
        userName,
        myNotifications: Notifications.find({}).fetch()
    };
})(Header);
