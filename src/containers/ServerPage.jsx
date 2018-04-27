import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';



class ServerPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div>
                    <Row>
                        <Col md={12}/>
                        <h1>Адміністрування</h1>
                        <p>Дана сторінка працює тільки з увімкненим JavaScript!</p>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ServerPage;
