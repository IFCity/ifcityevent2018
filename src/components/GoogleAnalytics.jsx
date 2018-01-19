import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';


class GoogleAnalytics extends React.Component {

    componentWillUpdate ({ history, location }) {

        if (typeof (window) === 'undefined') return;

        if (location.pathname === this.props.location.pathname) {
            return;
        }

        if (history.action === 'PUSH') {
            //ReactGA.pageview(window.location.pathname + window.location.search);
            ReactGA.ga('send', {
                hitType: 'pageview',
                title: window.document.title,
                location: window.location.pathname + window.location.search,
                page: location.pathname
            });
        }
    }

    render () {
        return null;
    }
}

export default withRouter(GoogleAnalytics);
