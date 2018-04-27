import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import { Loading } from '../components/tools.jsx';
import { EventsList } from '../views/events.jsx';
import { FacebookCard } from '../views/cards.jsx';


class EventsBlock extends Component {
    render() {
        const {data, metadata} = this.props.events;
        let events = data;
        if (!this.props.noLimit) {
            events = data.slice(0, this.props.limit || 6);
        }

        return [
            <Loading {...metadata} mask={true} className="event-region">
                <Row className="event-region-title">
                    <Col sm={6}>
                        <h2>{this.props.title}</h2>
                    </Col>
                    <Col sm={6}>
                        {this.props.hideLinks ? null : <Link to={this.props.link} className="see-more" href="#">показати більше <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></Link>}
                    </Col>
                </Row>
                <EventsList
                    {...this.props}
                    events={events}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
                {this.props.hideLinks ? null : <Row className="event-region-title">
                    <Col sm={12}>
                        <Link to={this.props.link} className="see-more bottom" href="#">показати усі <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></Link>
                    </Col>
                </Row>}
            </Loading>
        ];
    }
}

EventsBlock.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};


class EventRegion extends Component {
    render() {
        if (this.props.hideEmpty && (this.props.events.data.length === 0)) {
            return null;
        }
        return (
            <Row className={`${this.props.type}-region`}>
                <Col md={12}>
                    <EventsBlock {...this.props} />
                </Col>
            </Row>
        )
    }
}

class PopularEventRegion extends Component {
    render() {
        const title = (
            <h2>Популярні події в <span>Івано-Франківську</span></h2>
        );
        return (
            <EventRegion
                title={title}
                limit={11}
                additionalCard={<FacebookCard/>}
                type='mostviewed'
                hideLinks
                {...this.props}
            />
        )
    }
}

class AttentionEventRegion extends Component {
    render() {
        const title = (
            <h2>Увага!</h2>
        );
        return (
            <EventRegion
                title={title}
                limit={6}
                type='attention'
                link='/category/attention'
                hideEmpty
                {...this.props}
            />
        )
    }
}

class PromoEventRegion extends Component {
    render() {
        const title = (
            <h2>Акції та Знижки</h2>
        );
        return (
            <EventRegion
                title={title}
                limit={3}
                type='promo'
                link='/category/discounts'
                hideEmpty
                {...this.props}
            />
        )
    }
}

class TodayEventRegion extends Component {
    render() {
        const title = (
            <h2>Сьогодні</h2>
        );
        return (
            <EventRegion
                title={title}
                limit={9}
                type='today'
                link='/search/?period=today'
                {...this.props}
            />
        )
    }
}

class FilmEventRegion extends Component {
    render() {
        const title = (
            <h2>Що показують в <span>кінотеатрах</span></h2>
        );
        return (
            <EventRegion
                title={title}
                limit={6}
                type='film'
                link='/category/film'
                {...this.props}
            />
        )
    }
}

class ChildEventRegion extends Component {
    render() {
        const title = (
            <h2>Підходить <span>для дітей</span></h2>
        );
        return (
            <EventRegion
                title={title}
                limit={3}
                type='child'
                link={`/tags/${encodeURIComponent('підходить для дітей')}`}
                {...this.props}
            />
        )
    }
}

class RelatedEventRegion extends Component {
    render() {
        const title = (
            <h2>Схожі заходи</h2>
        );
        return (
            <EventRegion
                title={title}
                limit={6}
                type='related'
                {...this.props}
            />
        )
    }
}

export default EventRegion;
export {
    PopularEventRegion,
    AttentionEventRegion,
    PromoEventRegion,
    TodayEventRegion,
    FilmEventRegion,
    ChildEventRegion,
    RelatedEventRegion
}