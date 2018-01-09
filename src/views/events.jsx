import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';

import { getEventsAction } from '../actions/eventsActions';
import { NoData, Loading } from '../components/tools.jsx';
import { EventTime, EventPlace, EventPrice } from '../components/eventAttributes.jsx';


const EventDefault = (props) => {
    const {event, even} = props;
    const info =
        <Col xs={5}>
            <h4>{event.name}</h4>
            <Row style={{marginLeft: '-15px', marginRight: '-15px'}}>
                <Col xs={8}>
                    <EventPlace place={event.place}/>
                    <EventTime event={event}/>
                </Col>
                <Col xs={4}>
                    <EventPrice event={event}/>
                </Col>
            </Row>
            <p className="description">{event.description}</p>
            <a target="_blank" href={`https://www.facebook.com/events/${event.id}`}>
                детальніше у Facebook →
            </a>
        </Col>;
    const cover =
        <Col xs={7}>
            <img src={event.cover.source}/>
        </Col>;
    return (
        <Row
            key={event._id}
            className={`event-default event-default-${even ? 'even' : 'odd'}`}
        >
            {even ? [info, cover] : [cover, info]}
        </Row>
    );
};

class Search extends Component {
    render() {
        return (
            <div>
                <span>Пошук</span>
                <input type="text"/>
            </div>
        );
    }
}

class EventsList extends Component {
    render() {
        const {events} = this.props;
        const noData =
            <NoData>
                <h1>Вибачте, в даній категорії немає наразі подій</h1>
                <p>Можливо наступні події вас зацікавлять:</p>
                <ul>
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
            </NoData>;
        return (
            <div>
                <Search/>
                {events.length ?
                    events.map((event, index) => (
                        <EventDefault
                            {...this.props}
                            event={event}
                            even={index % 2 === 0}
                        />
                    ))
                    : noData}
            </div>
        );
    }
}

class Events extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.search(this.props.match.params.categoryid || null);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.categoryid !== nextProps.match.params.categoryid) {
            this.search(nextProps.match.params.categoryid);
        }
    }

    search(category) {
        this.props.dispatch(getEventsAction(category));
    }

    render() {
        const {data, metadata} = this.props.events;
        return (
            <Loading {...metadata} mask={true}>
                <EventsList events={data} dispatch={this.props.dispatch}/>
            </Loading>
        );
    }
}

Events.propTypes = {
    events: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default Events;
