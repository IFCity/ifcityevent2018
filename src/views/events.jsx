import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { slugify } from 'transliteration';

import { getEventsAction } from '../actions/eventsActions';
import { getCategoriesAction } from '../actions/categoriesActions';
import { NoData, Loading } from '../components/tools.jsx';
import {
    EventTime,
    EventPlace,
    EventPrice,
    EventPhone,
    EventType,
    EventShare
} from '../components/eventAttributes.jsx';


export const EventDefault = (props) => {
    const {event, even, categories, showShareLinks, deepLinking} = props;
    const info =
        <Col md={6}>
            {deepLinking ?
                <Link to={`/event/${event._id}/${slugify(event.name)}`}>
                    <h4>{event.name}</h4>
                </Link> :
                <h4>{event.name}</h4>}
            <EventType category={event.category} categories={categories}/>
            <EventPlace place={event.place}/>
            <EventTime event={event}/>
            <EventPrice event={event}/>
            <EventPhone phone={event.phone}/>
            {showShareLinks ? <EventShare event={event}/> : null}
            <p className="description">{event.description}</p>
            <a target="_blank" href={`https://www.facebook.com/events/${event.id}`}>
                детальніше у Facebook →
            </a>
        </Col>;
    const cover =
        <Col md={6}>
            <img src={_.get(event, 'cover.source', '')}/>
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

const Divider = ({text}) => (
    <div className="divider">
        <span>{text}</span>
    </div>
);

const today = moment();
const isToday = event => {
    return moment(event.start_time).format('YYYY-MM-DD') <= today.format('YYYY-MM-DD');
};

class EventsList extends Component {
    render() {
        let {events} = this.props;
        let todayEvents = _(events)
            .filter(event => isToday(event))
            .value();
        let laterEvents = _(events)
            .filter(event => !isToday(event))
            .value();
        const noTodayData =
            <NoData>
                <h1>Сьогодні тут немає подій</h1>
            </NoData>;
        const noLaterData =
            <NoData>
                <h1>Немає наразі більше подій</h1>
            </NoData>;
        return (
            <div>
                <Divider text="Сьогодні"/>
                {todayEvents.length ?
                    todayEvents.map((event, index) => (
                        <EventDefault
                            {...this.props}
                            deepLinking
                            event={event}
                            even={index % 2 === 0}
                        />
                    ))
                    : noTodayData}
                <Divider text="Пізніше"/>
                {laterEvents.length ?
                    laterEvents.map((event, index) => (
                        <EventDefault
                            {...this.props}
                            deepLinking
                            event={event}
                            even={index % 2 === 0}
                        />
                    ))
                    : noLaterData}
            </div>
        );
    }
}

class Events extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.search(this.props.match.params.categoryid || null);
        this.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.categoryid !== nextProps.match.params.categoryid) {
            this.search(nextProps.match.params.categoryid);
        }
    }

    search(category) {
        this.props.dispatch(getEventsAction(category));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        return (
            <Loading {...metadata} mask={true}>
                <EventsList events={data} categories={this.props.categories.data} dispatch={this.props.dispatch}/>
            </Loading>
        );
    }
}

Events.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default Events;
