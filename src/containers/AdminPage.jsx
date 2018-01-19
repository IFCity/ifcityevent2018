import React, {Component} from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Aggregation from '../views/admin/aggregation.jsx';
import Pages from '../views/admin/pages.jsx';
import Categories from '../views/admin/categories.jsx';
import Users from '../views/admin/users.jsx';
import { NotFound } from '../components/tools.jsx';
import GoogleAnalytics from '../components/GoogleAnalytics.jsx';


const routes = [{
    path: '/admin/aggregation',
    key: 'admin_aggregation',
    exact: true,
    component: Aggregation
}, {
    path: '/admin/pages',
    key: 'admin_pages',
    exact: true,
    component: Pages
}, {
    path: '/admin/categories',
    key: 'admin_categories',
    exact: true,
    component: Categories
}, {
    path: '/admin/users',
    key: 'admin_users',
    exact: true,
    component: Users
}];

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.authorize = this.authorize.bind(this);
    }

    authorize() {
        if (!_.get(this.props, 'authorization.data.authData.accessToken')) {
            this.context.router.history.push('/');
        }
    }

    componentDidMount() {
        this.authorize();
    }

    render() {
        return (
            <div className="content-wrapper">
                <Switch>
                    {_(routes)
                        .map(route => <Route {...route}/>)
                        .value()}
                    <Route component={NotFound}/>
                </Switch>
                <GoogleAnalytics/>
            </div>
        );
    }
}

AdminPage.propTypes = {
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

AdminPage.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    })
};

const mapStateToProps = (state) => {
    return {
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(AdminPage);