import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Events from '../views/events.jsx';
import MostViewed from '../views/mostViewed.jsx';


class TermsPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div style={{background: '#fff'}}>
                    <Row>
                        <Col md={2}/>
                        <Col md={8}>
                            <h1>Умови використання сайту</h1>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default TermsPage;
