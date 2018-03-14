import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap'


class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-bottom">
                <div className="container">
                    <Row>
                        <Col xs={6}>
                            <h3>Користування сайтом</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/myifevent/" target="_blank">Умови використання</a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/myifevent/" target="_blank">Як додати подію?</a>
                                </li>
                            </ul>
                        </Col>
                        <Col xs={6}>
                            <h3>Зв'язатись з нами</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/myifevent/" target="_blank">Facebook</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p className="text-muted">&copy; IFCityEvent, 2017-2018</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Footer;
