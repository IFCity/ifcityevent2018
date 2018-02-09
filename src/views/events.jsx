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
    EventShare,
    EventSource,
    EventMetadata
} from '../components/eventAttributes.jsx';
import Toolbar from '../components/Toolbar.jsx';
import appSettings from '../constants/aplication';
import converter from '../services/daysBitsConverter';


export const EventDefault = (props) => {
    const {event, even, categories, showShareLinks, deepLinking} = props;
    const detailedLink = `/event/${event._id}/${slugify(event.name)}`;
    const info =
        <Col md={6}>
            {deepLinking ?
                <Link to={detailedLink}>
                    <h4>{event.name}</h4>
                </Link> :
                <h4>{event.name}</h4>}
            <EventType category={event.category} categories={categories}/>
            <EventPlace place={event.place}/>
            <EventTime event={event}/>
            <EventPrice event={event}/>
            <EventPhone phone={event.phone}/>
            <EventSource event={event}/>
            <EventMetadata event={event}/>
            {showShareLinks ? <EventShare event={event}/> : null}
            <p className={deepLinking ? 'description wrap' : 'description'}>{event.description}</p>
            {deepLinking ? <a className="detailed" href={detailedLink}>...показати більше</a> : null}
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

export const EventText = (props) => {
    const {event} = props;
    const detailedLink = `${appSettings.appUrl}/event/${event._id}/${slugify(event.name)}`;
    return (
        <p>
            {event.name}{' ('}
            <EventPlace place={event.place} plain/>{'; '}
            <EventTime event={event} plain/>{'; '}
            <EventPrice event={event} plain/>{'; '}
            {detailedLink}{')'}
        </p>
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

const isToday = event => {
    const today = moment();
    let result = moment(event.start_time).format('YYYY-MM-DD') <= today.format('YYYY-MM-DD');
    if (result) {
        if (!event.weeklyRecurrence) {
            result = true;
        } else {
            const days = converter.bitToDays(event.weeklyRecurrence);
            result = days[moment().day()];
        }
    }
    return result;
};

class EventsList extends Component {
    render() {
        const today = moment();
        let {events} = this.props;
        let todayEvents = _(events)
            .filter(event => isToday(event))
            .orderBy(event => moment(event.update_time))
            .reverse()
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
                <Divider text={`Сьогодні, ${today.format('D MMMM')}`}/>
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
        this.props.dispatch(getEventsAction({category: category}));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        return [
            <Toolbar/>,
            <Loading {...metadata} mask={true}>
                <EventsList events={data} categories={this.props.categories.data} dispatch={this.props.dispatch}/>
            </Loading>
        ];
    }
}

Events.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default Events;
