import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class CategoryCard extends Component {
    render() {
        return (
            <Col md={this.props.size}>
                <Link to={this.props.link}>
                    <div className={`category-${this.props.category}`}>
                        <h4>{this.props.label}</h4>
                        <span>{this.props.helpText}</span>
                    </div>
                </Link>
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
                        <CategoryCard size={5} category="teatr" link="category/teatr" label="Театр" helpText="Вистави, дитячі вистави"/>
                        <CategoryCard size={4} category="sport" link="category/sport" label="Спорт" helpText="Футбол, здоров'я, бойові мистецва, йога"/>
                    </Row>
                    <Row className="category-panel">
                        <CategoryCard size={4} category="concert" link="category/concert" label="Концерти"/>
                        <CategoryCard size={3} category="art" link={`tags/${encodeURIComponent('мистецтво')}`} label="Мистецтво" helpText="Мистецтво, живопис, виставки, перформенс"/>
                        <CategoryCard size={5} category="disco" link="category/disco" label="Клуб/Диско" helpText="Party, клубне життя, вечірки"/>
                    </Row>
                    <Row className="category-panel">
                        <CategoryCard size={5} category="conference" link={`tags/${encodeURIComponent('конференція')}`} label="Конференції" helpText="Дискусії, бізнес-зустрічі"/>
                        <CategoryCard size={7} category="workshop" link={`tags/${encodeURIComponent('воркшоп')}`} label="Воркшопи"  helpText="Навчання, воркшопи, майстер-класи"/>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export {CategoryCard, FacebookCard, AlsoCards};