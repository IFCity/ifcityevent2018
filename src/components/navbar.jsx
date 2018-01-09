import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import appSettings from '../constants/aplication';


class MainNavbar extends Component {
    render() {
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
                    </div>
                </div>
            </nav>
        );
    }
}

export default MainNavbar;
