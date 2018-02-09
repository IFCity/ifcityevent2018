import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { categoryMenuRoutes } from '../routes';


class Toolbar extends Component {
    render() {
        const categoryMenuItems = _(categoryMenuRoutes)
            .map(item => {
                return (
                    <li className={item.disabled ? 'disabled' : ''}>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                );
            })
            .value();
        return (
            <ul className="nav nav-pills">
                {categoryMenuItems}
            </ul>
        );
    }
}

export default Toolbar;