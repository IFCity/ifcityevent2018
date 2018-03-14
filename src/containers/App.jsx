import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import ScrollToTop from 'react-scroll-up';

import routes from '../routes';
import Navbar from '../components/navbar.jsx';
import Footer from '../components/footer.jsx';
import {NotFound } from '../components/tools.jsx';
import GoogleAnalytics from '../components/GoogleAnalytics.jsx';


class App extends Component {
    componentDidMount() {
        this.state = {
            isClient: true
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container container-fluid-full">
                    <Switch>
                        {routes.map(route => (
                            <Route {...route} {...this.props}/>
                        ))}
                        <Route component={NotFound}/>
                    </Switch>
                    <GoogleAnalytics />
                </div>
                <Footer/>
                <div className="up">
                    <ScrollToTop showUnder={160}>
                        <span>Нагору</span>
                    </ScrollToTop>
                </div>
            </div>
        );
    }
}

export default App;