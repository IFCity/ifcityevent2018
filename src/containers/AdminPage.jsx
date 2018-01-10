import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {checkLoginStatus} from '../services/authorizationService';
import fb from 'facebook-login-promises';
import appSettings from '../constants/aplication';


const params = {
    appId: appSettings.FBPageId
};

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: undefined,
            user: {
                id: null,
                name: ''
            }
        };
        this.authorize = this.authorize.bind(this);
    }

    authorize() {
        if (!this.state.loading && (this.state.status !== 'connected')) {
            this.context.router.history.push('/');
        }
    }

    /* componentDidMount() {
        /*checkLoginStatus(response => {
            this.setState(
                response,
                () => this.authorize()
            );
        });
    } */

    componentDidMount() {
        fb.callback.checkStatus(params, response => console.log(response));
    }

    render() {
        return (
            <div className="content-wrapper">
                <Row>
                    <Col sm={12}>
                        <h1>Admin</h1>
                        <h2>{this.state.user.name}</h2>
                    </Col>
                </Row>
            </div>
        );
    }
}

AdminPage.propTypes = {
    events: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

AdminPage.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    })
};

const mapStateToProps = (state) => {
    return {
        events: state.events
    };
};

export default connect(mapStateToProps)(AdminPage);