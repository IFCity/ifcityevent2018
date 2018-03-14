import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class CategoryCard extends Component {
    render() {
        return (
            <Col md={this.props.size} className={`category-${this.props.category}`}>
                <div>
                    <Link to={this.props.link}>{this.props.label}</Link>
                </div>
            </Col>
        )
    }
}

class FacebookCard extends Component {
    render() {
        return (
            <div className="event-new-wrapper">
                <a href="https://www.facebook.com/myifevent" target="_blank">
                    <div className="event-new card-facebook">
                        <h3>Приєднуйтесь до нас у Facebook</h3>
                        <span>IFCityEvent -  всі події твого міста</span>
                    </div>
                </a>
            </div>
        );
    };
}

class AlsoCards extends Component {
    render() {
        return (
            <Row>
                <Col md={12} className="event-region">
                    <Row className="event-region-title">
                        <Col sm={12}>
                            <h2>А також</h2>
                        </Col>
                    </Row>
                    <Row className="category-panel">
                        <CategoryCard size={3} category="weekend" link="legacy" label="Куди піти на вихідних"/>
                        <CategoryCard size={5} category="teatr" link="category/teatr" label="Театр"/>
                        <CategoryCard size={4} category="sport" link="category/sport" label="Спорт"/>
                    </Row>
                    <Row className="category-panel">
                        <CategoryCard size={4} category="concert" link="category/concert" label="Концерти"/>
                        <CategoryCard size={3} category="exibition" link="category/exibition" label="Виставки"/>
                        <CategoryCard size={5} category="disco" link="category/disco" label="Клуб / Диско"/>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export {CategoryCard, FacebookCard, AlsoCards};