import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import {connect} from 'react-redux';

import routes from '../routes';
import Navbar from '../components/navbar.jsx';
import { loginAction, logoutAction, checkStatusAction } from '../actions/authorizationActions';


const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
        if (staticContext)
            staticContext.status = code;
        return children
    }}/>
);

const NotFound = () => (
    <Status code={404}>
        <div>
            <h1>Sorry, can’t find that.</h1>
        </div>
    </Status>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: undefined,
            user: {
                id: null,
                name: ''
            }
        };
        this.doLogin = this.doLogin.bind(this);
        this.doLogout = this.doLogout.bind(this);
        this.setupNavbar = this.setupNavbar.bind(this);
    }

    setupNavbar(response) {
        if ((!response.loading) && (response.status === 'connected')) {
            this.setState({
                status: response.status,
                user: {
                    id: response.data.id,
                    name: response.data.first_name
                }
            });
        } else {
            this.setState({
                status: response.status,
                user: {
                    id: null,
                    name: ''
                }
            });
        }
    }

    doLogin() {
        //this.props.dispatch(loginAction());
    }

    doLogout() {
        //this.props.dispatch(logoutAction());
    }

    componentDidMount() {
        //this.props.dispatch(checkStatusAction());
    }

    render() {
        //const { data } = this.props.authorization;
        const data = {};
        return (
            <div>
                <Navbar doLogin={this.doLogin} doLogout={this.doLogout} user={data}/>
                <div className="container-fluid container-fluid-full">
                    <Switch>
                        {routes.map(route => (
                            <Route {...route} {...this.props}/>
                        ))}
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    })
};

App.propTypes = {
    //dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        authorization: state.authorization
    };
};

//export default App;

export default connect(mapStateToProps)(App);
