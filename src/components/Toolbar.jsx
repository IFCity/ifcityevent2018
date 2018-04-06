import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Row, Col, FormControl, Button} from 'react-bootstrap';

import { categoryMenuRoutes } from '../routes';


class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.changeCategory = this.changeCategory.bind(this);
    }

    changeCategory(e) {
        this.context.router.history.push(e.target.value);
    }

    render() {
        const timeItems = [{
            id: 'today',
            title: 'За весь час'
        }];
        let categoryMenuOptions = _(categoryMenuRoutes())
            .map(item => <option value={item.path}>{item.title}</option>)
            .value();
        const timeOptions = _(timeItems)
            .map(item => <option value={item.id}>{item.title}</option>)
            .value();
        let categoryId = '/search';
        if (this.props.params.categoryid) {
            categoryId = _.get(_(categoryMenuRoutes())
                .filter(item => item.path === `/category/${this.props.params.categoryid}`)
                .value(), '[0].path', '/search');
        }
        let searchText = this.props.params.tagname || '';
        return (
            <Row className="toolbar">
                <h2>Відкрий цікаві події Івано-Франківська</h2>
                <Col md={3}>
                    <select
                        className="form-control"
                        onChange={this.changeCategory}
                        value={categoryId}
                    >
                        {categoryMenuOptions}
                    </select>
                </Col>
                <Col md={3}>
                    <select
                        disabled={true}
                        className="form-control"
                        onChange={this.handleChange}
                        value={{}}
                    >
                        {timeOptions}
                    </select>
                </Col>
                <Col md={4}>
                    <FormControl
                        disabled={true}
                        type="text"
                        placeholder="Що вас цікавить"
                        value={searchText}
                        onChange={this.handleDescriptionChange}
                    />
                </Col>
                <Col md={2}>
                    <Button disabled={true}>Знайти</Button>
                </Col>
                {/*<Col md={4} className="checkboxes">
                    <input
                        name="isEndDate"
                        type="checkbox"
                        checked={this.props.groupEvents}
                        onChange={this.props.toggleGroup}
                    />
                    <ControlLabel>Групувати однакові події</ControlLabel>
                </Col>*/}
            </Row>
        );
    }
}


Toolbar.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    })
};

export default Toolbar;