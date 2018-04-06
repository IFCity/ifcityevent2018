import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import map from 'lodash/map';

import appSettings from '../constants/aplication';
import { loginAction, logoutAction, checkStatusAction } from '../actions/authorizationActions';
import { mainMenuRoutes, adminMenuRoutes } from '../routes';


class MainNavbar extends Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.doLogout = this.doLogout.bind(this);
    }

    doLogin() {
        this.props.dispatch(loginAction());
    }

    doLogout() {
        this.props.dispatch(logoutAction());
        this.context.router.history.push('/');
    }

    componentDidMount() {
        this.props.dispatch(checkStatusAction());
    }

    render() {
        const { userData, authData } = this.props.authorization.data;
        const mainMenuItems = map(mainMenuRoutes, (item, index) => {
                return (
                    <li className={item.disabled ? 'disabled' : ''} role="presentation">
                        <Link to={item.path}>
                            {item.icon ? <span className={`glyphicon glyphicon-${item.icon}`} aria-hidden="true"></span> : null}
                            {item.title}
                        </Link>
                    </li>
                );
            });
        const adminMenuItems = userData.id && (authData.role === 'admin') ?
            map(adminMenuRoutes, item => {
                    return (
                        <li className={item.disabled ? 'disabled' : ''} role="presentation">
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    );
                })
            : null;
        const rightMenu =
            <Nav pullRight>
                <li role="presentation">
                    <Link to="/docs/addevent">Як додати подію на сайт?</Link>
                </li>
            </Nav>;
        const userMenu = userData.id ?
            <Nav pullRight>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Вітаємо, {userData.first_name} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        {adminMenuItems}
                        <li role="separator" className="divider"></li>
                        <li role="presentation">
                            <a href="#" onClick={this.doLogout}>Вийти</a>
                        </li>
                    </ul>
                </li>
            </Nav>:
            <form className="navbar-form navbar-right">
                <Button bsStyle="success" onClick={this.doLogin}>Вхід</Button>
            </form>;
        return (
            <Navbar collapseOnSelect fixedTop fluid bsStyle="default">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link className="navbar-brand" to="/">
                            {appSettings.appName}
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {mainMenuItems}
                    </Nav>
                    {userMenu}
                    {rightMenu}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

MainNavbar.propTypes = {
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

MainNavbar.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    })
};

const mapStateToProps = (state) => {
    return {
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(MainNavbar);
