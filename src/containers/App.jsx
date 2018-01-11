import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import routes from '../routes';
import Navbar from '../components/navbar.jsx';
import {NotFound } from '../components/tools.jsx';


class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>
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

export default App;