import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

import { getEventsAction } from '../actions/eventsActions';
import { getCategoriesAction } from '../actions/categoriesActions';
import { NoData, Loading } from '../components/tools.jsx';
import { EventTime, EventPlace, EventPrice, EventPhone, EventType } from '../components/eventAttributes.jsx';


const EventDefault = (props) => {
    const {event, even, categories} = props;
    const info =
        <Col xs={6}>
            <h4>{event.name}</h4>
            <EventType category={event.category} categories={categories}/>
            <EventPlace place={event.place}/>
            <EventTime event={event}/>
            <EventPrice event={event}/>
            <EventPhone phone="+38 (096) 751-61-85"/>
            <p className="description">{event.description}</p>
            <a target="_blank" href={`https://www.facebook.com/events/${event.id}`}>
                детальніше у Facebook →
            </a>
        </Col>;
    const cover =
        <Col xs={6}>
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
            </NoData>;
        return (
            <div>
                {/*<Search/>*/}
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
