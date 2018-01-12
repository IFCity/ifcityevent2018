import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

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
        const mainMenuItems = _(mainMenuRoutes)
            .map(item => {
                return (
                    <li>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                );
            })
            .value();
        const adminMenuItems = userData.id && (authData.role === 'admin') ?
            _(adminMenuRoutes)
                .map(item => {
                    return (
                        <li>
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    );
                })
                .value()
            : null;
        const userMenu = userData.id ?
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Вітаємо, {userData.first_name} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        {adminMenuItems}
                        <li role="separator" className="divider"></li>
                        <li>
                            <a href="#" onClick={this.doLogout}>Вийти</a>
                        </li>
                    </ul>
                </li>
            </ul>:
            <form className="navbar-form navbar-right">
                <Button bsStyle="success" onClick={this.doLogin}>Вхід</Button>
            </form>;
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            {appSettings.appName}
                        </Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {mainMenuItems}
                        </ul>
                        {userMenu}
                    </div>
                </div>
            </nav>
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
