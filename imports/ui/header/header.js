import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Menu, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.renderLogins = this.renderLogins.bind(this);
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

    facebookLogin() {
        const options = { requestPermissions: ['email'], loginStyle: 'redirect' };

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
            <Menu inverted fixed="top">
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
    const currentUser = Meteor.user();
    const userName = currentUser && currentUser.profile.name;

    return {
        currentUser,
        userName
    };
})(Header);
