import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import '/public/style/header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.renderLogins = this.renderLogins.bind(this);
        this.renderNotifications = this.renderNotifications.bind(this);
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
            const noNotifications = <Icon name="bell outline" />;
            const notifications = <Icon.Group>
                <Icon name="bell outline" />
                <Icon id="circle" corner name="circle" />
            </Icon.Group>;

            return (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Dropdown icon={noNotifications}>
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
            )
        }
    }

    renderNotifications() {
        console.log(this.props.myNotifications);

        if (this.props.myNotifications.notifications.length === 0) {
            return <Dropdown.Item text="No Notifications" />
        } else {
            return this.props.myNotifications.notifications.map((notification) => {
                return <Dropdown.Item icon="bell" text={notification} />
            });
        }
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
    const handle = Meteor.subscribe('users.notifications-for-me');
    const ready = handle.ready();
    const currentUser = Meteor.user();
    const userName = currentUser && currentUser.profile.name;

    return {
        ready,
        currentUser,
        userName,
        myNotifications: Meteor.users.find(
            { _id: Meteor.userId() },
            { fields: { notifications : 1 }}
        ).fetch()[0]
    };
})(Header);
