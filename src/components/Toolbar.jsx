import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Row, Col, FormControl, Button} from 'react-bootstrap';


export const categoryMenuRoutes = [
    {
        value: '/search',
        title: 'Всі події'
    }, {
        value: '/category/film',
        title: 'Кіно'
    }, {
        value: '/category/concert',
        title: 'Концерти'
    }, {
        value: '/category/sport',
        title: 'Спорт'
    }, {
        value: '/category/teatr',
        title: 'Театр'
    }, {
        value: '/category/exibition',
        title: 'Виставки'
    }, {
        value: '/category/masterclass',
        title: 'Майстер-класи'
    }, {
        value: '/category/disco',
        title: 'Клуб'
    }, {
        value: '/category/not_set',
        title: 'Масові заходи'
    }, {
        value: '/category/attention',
        title: 'Увага!'
    }, {
        value: '/category/discounts',
        title: 'Акції та знижки'
    }
];

export const periodMenuRoutes = [
    {
        value: 'all',
        title: 'За весь час'
    }, {
        value: 'today',
        title: 'Сьогодні'
    }, {
        value: 'tomorrow',
        title: 'Завтра'
    }
];

class Toolbar extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            categoryId: props.params.categoryid ? `/category/${props.params.categoryid}` : '/search',
            period: (props.query && props.query.period) || 'all'
        };
        this.goTo = this.goTo.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changePeriod = this.changePeriod.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.categoryid !== nextProps.params.categoryid) {
            this.setState({
                categoryId: nextProps.params.categoryid ? `/category/${nextProps.params.categoryid}` : '/search'
            });
        }
    }

    changeCategory(e) {
        this.setState({
            categoryId: e.target.value
        }, () => this.goTo());
    }

    changePeriod(e) {
        this.setState({
            period: e.target.value
        }, () => this.goTo());
    }

    goTo() {
        this.context.router.history.push(`${this.state.categoryId}/?period=${this.state.period}`);
    }

    render() {
        let categoryMenuOptions = _(categoryMenuRoutes)
            .map(item => <option value={item.value}>{item.title}</option>)
            .value();

        let periodMenuOptions = _(periodMenuRoutes)
            .map(item => <option value={item.value}>{item.title}</option>)
            .value();

        let searchText = this.props.params.tagname || '';
        return (
            <Row className="toolbar">
                <h2>Відкрий цікаві події Івано-Франківська</h2>
                <Col md={3}>
                    <select
                        className="form-control"
                        onChange={this.changeCategory}
                        value={this.state.categoryId}
                    >
                        {categoryMenuOptions}
                    </select>
                </Col>
                <Col md={3}>
                    <select
                        className="form-control"
                        onChange={this.changePeriod}
                        value={this.state.period}
                    >
                        {periodMenuOptions}
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