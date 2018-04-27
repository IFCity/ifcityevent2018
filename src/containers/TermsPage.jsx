import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';


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
