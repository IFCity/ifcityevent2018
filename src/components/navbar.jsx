import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import appSettings from '../constants/aplication';


class MainNavbar extends Component {
    render() {
        const {doLogin, doLogout, user} = this.props;
        const userMenu = user.id ?
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/admin/fbfetch">FB Агрегація</Link>
                </li>
                <li>
                    <Link to="/admin/events">Редагування подій</Link>
                </li>
                <li>
                    <Link to="/admin/pages">Редагування сторінок</Link>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        Вітаємо, {user.first_name} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="#" onClick={doLogout}>Вийти</a></li>
                    </ul>
                </li>
            </ul>:
            <form className="navbar-form navbar-right">
                <Button bsStyle="success" onClick={doLogin}>Вхід</Button>
            </form>;
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            {appSettings.appName}
                        </Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/">Всі події</Link>
                            </li>
                            <li>
                                <Link to="/category/film">Кіно</Link>
                            </li>
                            <li>
                                <Link to="/category/concert">Концерти</Link>
                            </li>
                            <li>
                                <Link to="/category/sport">Cпорт</Link>
                            </li>
                            <li>
                                <Link to="/category/teatr">Театр</Link>
                            </li>
                            <li>
                                <Link to="/category/exibition">Виставка</Link>
                            </li>
                            <li>
                                <Link to="/category/disco">Клуб/диско</Link>
                            </li>
                            <li>
                                <Link to="/category/not_set">Масовий захід</Link>
                            </li>
                            <li>
                                <Link to="/category/attention">Увага!</Link>
                            </li>
                        </ul>
                        {userMenu}
                    </div>
                </div>
            </nav>
        );
    }
}

export default MainNavbar;
