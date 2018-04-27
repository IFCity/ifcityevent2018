import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';


class AddEventPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <div style={{background: '#fff'}}>
                    <Row>
                        <Col md={2}/>
                        <Col md={8}>
                            <h1>Для організаторів подій</h1>
                            <p>Ви організатор події у Івано-Франківську і хочете повідомити про неї франківчанам?</p>
                            <p>У вас є два варіанти як зробити це. Виберіть той варіант, який найбільше вам підходить:</p>
                            <ul>
                                <li>Заповніть цю <a href="https://goo.gl/WfbGAe" target="_blank">форму</a></li>
                                <li>Створіть подію у Facebook і вишліть посилання нам на пошту <a href="mailto:info@ifcity.if.ua">info@ifcity.if.ua</a> або
                                    на сторінки <a href="https://www.facebook.com/cityIF/" target="_blank">IFCity</a> чи <a href="https://www.facebook.com/myifevent/" target="_blank">IFCityEvent</a></li>
                            </ul>
                            <h2>Маєте сторінку у Facebook?</h2>
                            <p>Ви ведете або знаєте сторінку, що часто проводить цікаві події в Івано-Франківську? Повідомте нам на
                                пошту <a href="mailto:info@ifcity.if.ua">info@ifcity.if.ua</a> або на сторінки <a href="https://www.facebook.com/cityIF/" target="_blank">IFCity</a> чи <a href="https://www.facebook.com/myifevent/" target="_blank">IFCityEvent</a>.
                            Ми додамо її в нашу базу і події зі сторінки будуть автоматично додаватись до нас на сайт та у мобільний додаток IFCity.</p>
                            <hr/>
                            <div className="alert alert-info" role="alert">Який з варіантів ви б не обрали - ваш захід буде додано до мобільного додатку IFCITY,
                                та на сайт <a href="http://ifcityevent.com" target="_blank">http://ifcityevent.com</a>,
                                якими користуються майже 10 тисяч франківчан!</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}/>
                        <Col md={2}>
                            <img src="/public/images/ifcity.png" alt="Мобільний додаток IFCity" style={{width: '100%'}}/>
                        </Col>
                        <Col md={2}>
                            <img src="/public/images/ifcityandroid.png" alt="Мобільний додаток IFCity" style={{width: '100%'}}/>
                        </Col>
                        <Col md={4}>
                            <img src="/public/images/ifcityevent.png" alt="Мобільний додаток IFCity" style={{width: '100%'}}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AddEventPage;
