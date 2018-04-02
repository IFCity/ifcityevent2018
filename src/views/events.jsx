import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import {getEventsAction} from '../actions/eventsActions';
import {getCategoriesAction} from '../actions/categoriesActions';
import {NoData, Loading} from '../components/tools.jsx';
import {
    EventTime,
    EventPlace,
    EventPrice
} from '../components/eventAttributes.jsx';
import Toolbar from '../components/Toolbar.jsx';
import appSettings from '../constants/aplication';

import {EventSmall} from './event/event.jsx';

import { Sticky } from '../components/sticky.jsx';

moment.updateLocale('uk', {
    calendar: {
        sameDay: '[Сьогодні] о HH:mm',
        nextDay: '[Завтра] о HH:mm',
        nextWeek: '[Цього тижня] в ddd о HH:mm',
        sameElse: 'ddd о HH:mm'
    }
});

export const EventText = (props) => {
    const {event} = props;
    const detailedLink = `${appSettings.appUrl}/event/${event._id}`;
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

const Divider = ({text}) => (
    <div className="divider">
        <span>{text}</span>
    </div>
);

const isToday = event => moment(event.startCalcDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

const isTomorrow = event => moment(event.startCalcDate).format('YYYY-MM-DD') === moment().add(1, 'days').format('YYYY-MM-DD');

const isLater = event => moment(event.startCalcDate).format('YYYY-MM-DD') > moment().add(1, 'days').format('YYYY-MM-DD');


class EventsList extends Component {
    render() {
        let { events, additionalCard } = this.props;
        return (
            <div>
                {events.length ?
                    [
                        events.map(event => {
                            return (
                                <EventSmall
                                    {...this.props}
                                    event={event}
                                />
                            );
                        }),
                        additionalCard ? additionalCard : null,
                        <div style={{clear: 'both'}}/>
                    ]
                    : <NoData/>}
            </div>
        );
    }
}

class EventsListOld extends Component {
    render() {
        const today = moment();
        const tomorrow = moment().add(1, 'days');
        const todayDivider = <Divider text={`Сьогодні, ${today.format('D MMMM')}`}/>;
        const tomorrowDivider = <Divider text={`Завтра, ${tomorrow.format('D MMMM')}`}/>;
        const laterDivider = <Divider text="Пізніше"/>;
        let {events, title} = this.props;
        return (
            <div>
                {title ? <Row><Col md={12}><h1>{title}</h1></Col></Row> : null}
                {events.length ?
                    events.map((event, index) => {
                        let divider = null;
                        if (index === 0) {
                            if (isToday(event)) {
                                divider = todayDivider;
                            }
                            if (isTomorrow(event)) {
                                divider = tomorrowDivider;
                            }
                            if (isLater(event)) {
                                divider = laterDivider;
                            }
                        } else {
                            if (moment(event.startCalcDate).format('YYYY-MM-DD') !== moment(events[index - 1].startCalcDate).format('YYYY-MM-DD')) {
                                if (isToday(event)) {
                                    divider = todayDivider;
                                }
                                if (isTomorrow(event)) {
                                    divider = tomorrowDivider;
                                }
                                if (isLater(event) && (isToday(events[index - 1]) || isTomorrow(events[index - 1]))) {
                                    divider = laterDivider;
                                }
                            }
                        }
                        return (
                            <EventSmall
                                {...this.props}
                                divider={divider}
                                deepLinking
                                event={event}
                                even={index % 2 === 0}
                            />
                        );
                    })
                    : <NoData/>}
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
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
        this.search();
        this.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
        if ((this.props.match.params.categoryid !== nextProps.match.params.categoryid) ||
            (this.props.match.params.tagname !== nextProps.match.params.tagname) ||
            (this.props.match.params.holiday !== nextProps.match.params.holiday)) {
            this.search();
        }
    }

    search() {
        this.props.dispatch(getEventsAction());
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const today = moment();
        const tomorrow = today.clone().add(1, 'days');
        const {data, metadata} = this.props.events;
        let todayEvents = [];
        let tomorrowEvents = [];
        let laterEvents = [];
        _(data).map(event => {
                if (isToday(event)) {
                    todayEvents.push(event);
                }
                if (isTomorrow(event)) {
                    tomorrowEvents.push(event);
                }
                if (isLater(event)) {
                    laterEvents.push(event);
                }
        })
            .value();
        return [
            <Toolbar path={this.props.match.params.holiday}/>,
            <Loading {...metadata} mask={true} className="event-region">
                {this.props.match.params.tagname ?
                    (
                        <Row className="event-region-title">
                            <Col sm={6}>
                                <h2>Пошук за тегом: <span>{decodeURIComponent(this.props.match.params.tagname)}</span>
                                </h2>
                            </Col>
                        </Row>
                    ) : null}
                <Sticky className="sticky-one" data={data}>
                    <h3>Сьогодні, <strong>{today.format('D MMMM')}</strong></h3>
                </Sticky>
                <EventsList
                    events={todayEvents}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
                <Sticky className="sticky-two" data={data}>
                    <h3>Завтра, <strong>{tomorrow.format('D MMMM')}</strong></h3>
                </Sticky>
                <EventsList
                    events={tomorrowEvents}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
                <Sticky className="sticky-three" data={data}>
                    <h3>Пізніше</h3>
                </Sticky>
                <EventsList
                    events={laterEvents}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
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
export {EventsList};
