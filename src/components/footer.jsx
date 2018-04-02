import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';


class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-bottom">
                <div className="container">
                    <Row>
                        <Col md={4}>
                            <h3>Користування сайтом</h3>
                            <ul>
                                <li>
                                    <Link to="/docs/terms">Умови використання</Link>
                                </li>
                                <li>
                                    <Link to="/docs/addevent">Як додати подію?</Link>
                                </li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <h3>Зв'язатись з нами</h3>
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/myifevent/" target="_blank">Facebook</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <h3>Мобільний додаток IFCity</h3>
                            <ul>
                                <a href="https://itunes.apple.com/us/app/ifcity/id891326834?mt=8&ign-mpt=uo%3D4" target="_blank">
                                    <img src="/public/images/ios.svg" alt="IFCity iOS"/>
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.iuriioliiar.ifcity" target="_blank">
                                    <img src="/public/images/android.png" alt="IFCity Android" style={{height: '58px'}}/>
                                </a>
                            </ul>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="text-muted">&copy; IFCityEvent, 2017-2018</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Footer;
