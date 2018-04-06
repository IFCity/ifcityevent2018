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
import {categoryMenuRoutes} from "../routes";

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

const isToday = event => moment(event.startCalcDate).isSame(moment(), 'day');

const isTomorrow = event =>
    (
        moment(event.startCalcDate).isSame(moment().add(1, 'days'), 'day') ||
        (
            moment(event.startCalcDate).isSameOrBefore(moment().add(1, 'days'), 'day') &&
            moment(event.end_time).isSameOrAfter(moment().add(1, 'days'), 'day')
        )
    );

const isLater = event =>
    (
        moment(event.startCalcDate).isSame(moment().add(2, 'days'), 'day') ||
        (
            moment(event.startCalcDate).isSameOrBefore(moment().add(2, 'days'), 'day') &&
            moment(event.end_time).isSameOrAfter(moment().add(2, 'days'), 'day')
        ) ||
        moment(event.startCalcDate).isSameOrAfter(moment().add(2, 'days'), 'day')
    );


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

class ContentDescription extends Component {
    render() {
        return (
            <Row className="content-description">
                <Col xs={12}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.content.replace(/\n/g, '<br />')}} />
                </Col>
            </Row>
        );
    }
}

class Events extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.toggleGroup = this.toggleGroup.bind(this);
        this.state = {
            groupEvents: false
        }
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

    toggleGroup() {
        this.setState({groupEvents: !this.state.groupEvents});
    }

    render() {
        const today = moment();
        const tomorrow = today.clone().add(1, 'days');
        const later = today.clone().add(2, 'days');
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
        if (this.state.groupEvents) {
            todayEvents = _(todayEvents)
                .uniqBy(item => item.name)
                .value();
            tomorrowEvents = _(tomorrowEvents)
                .uniqBy(item => item.name)
                .value();
            laterEvents = _(laterEvents)
                .uniqBy(item => item.name)
                .value();
        }
        let content = '';
        if (this.props.match.params.categoryid) {
            content = _.get(_(this.props.categories.data)
                .filter(item => item.id === this.props.match.params.categoryid)
                .value(), '[0].descr', '');
        }
        return [
            <Toolbar
                params={this.props.match.params}
                toggleGroup={this.toggleGroup}
                groupEvents={this.state.groupEvents}
            />,
            <ContentDescription content={content}/>,
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
                {todayEvents.length > 0 ? [
                    <Sticky className="sticky-one" data={data}>
                        <div className="container">
                            <h3>Сьогодні, <strong>{today.format('D MMMM')}</strong></h3>
                        </div>
                    </Sticky>,
                    <EventsList
                        events={todayEvents}
                        categories={this.props.categories.data}
                        dispatch={this.props.dispatch}
                    />
                ] : null}
                {tomorrowEvents.length > 0 ? [
                    <Sticky className="sticky-two" data={data}>
                        <div className="container">
                            <h3>Завтра, <strong>{tomorrow.format('D MMMM')}</strong></h3>
                        </div>
                    </Sticky>,
                    <EventsList
                        events={tomorrowEvents}
                        categories={this.props.categories.data}
                        dispatch={this.props.dispatch}
                    />
                ] : null}
                {laterEvents.length > 0 ? [
                    <Sticky className="sticky-three" data={data}>
                        <div className="container">
                            <h3><strong>{later.format('D MMMM')} та пізніше</strong></h3>
                        </div>
                    </Sticky>,
                    <EventsList
                        events={laterEvents}
                        categories={this.props.categories.data}
                        dispatch={this.props.dispatch}
                    />
                ] : null}
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
