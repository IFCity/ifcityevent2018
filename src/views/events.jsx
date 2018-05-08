import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import queryString from 'query-string';
import Helmet from 'react-helmet';

import {getEventsAction} from '../actions/eventsActions';
import {getCategoriesAction} from '../actions/categoriesActions';
import {NoData, Loading} from '../components/tools.jsx';
import {
    EventTime,
    EventPlace,
    EventPrice
} from '../components/eventAttributes.jsx';
import {eventTimeObj, placeObj, priceObj} from '../services/logicHelper';
import Toolbar from '../components/Toolbar.jsx';
import appSettings from '../constants/aplication';

import {EventSmall} from './event/event.jsx';

import {Sticky} from '../components/sticky.jsx';
import {getTagsLookupAction} from '../actions/tagslookupActions';

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
    const detailedLink = `http:${appSettings.appUrl}/event/${event._id}`;
    return `${moment(event.start_time).format('HH:mm')} <a href="${detailedLink}" target="_blank">${event.name}</a> - ${placeObj(event.place).name}${placeObj(event.place).location ? ` (${placeObj(event.place).location})` : ''}\n`;
};

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
        let {events, additionalCard} = this.props;
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

class ContentDescription extends Component {
    render() {
        return (
            <Row className="content-description">
                <Col xs={12}>
                    <div dangerouslySetInnerHTML={{__html: this.props.content.replace(/\n/g, '<br />')}}/>
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
        this.getHelmet = this.getHelmet.bind(this);

        this.state = {
            groupEvents: false,
            query: queryString.parse(props.location.search || '?period=all'),
            helmet: this.getHelmet(props)
        }
    }

    componentDidMount() {
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
        this.search();
        this.fetchCategories();
        this.fetchTagsLookup();
    }

    getHelmet(props) {
        if (props.match.params.categoryid) {
            const category = _.get(_(props.categories.data)
                .filter(item => item.id === props.match.params.categoryid)
                .value(), '[0]', {});
            return category.name || '';
        } else if (props.match.params.tagname) {
            return `${decodeURIComponent(props.match.params.tagname || '')} - IFCityEvent`;
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
        this.setState({
            query: queryString.parse(nextProps.location.search || '?period=all'),
            helmet: this.getHelmet(nextProps)
        });
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

    fetchTagsLookup() {
        this.props.dispatch(getTagsLookupAction());
    }

    toggleGroup() {
        this.setState({groupEvents: !this.state.groupEvents});
    }

    render() {
        const today = moment();
        const tomorrow = today.clone().add(1, 'days');
        const later = today.clone().add(2, 'days');
        let {data, metadata} = this.props.events;
        let todayEvents = [];
        let tomorrowEvents = [];
        let laterEvents = [];

        if (this.state.query.period === 'today') {
            data = _(data)
                .filter(event => isToday(event))
                .value();
        }

        if (this.state.query.period === 'tomorrow') {
            data = _(data)
                .filter(event => isTomorrow(event))
                .value();
        }

        _(data).map(event => {
            if (isToday(event) && ((this.state.query.period === 'today') || (this.state.query.period === 'all'))) {
                todayEvents.push(event);
            }
            if (isTomorrow(event) && ((this.state.query.period === 'tomorrow') || (this.state.query.period === 'all'))) {
                tomorrowEvents.push(event);
            }
            if (isLater(event) && ((this.state.query.period === 'all'))) {
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
            const category = _.get(_(this.props.categories.data)
                .filter(item => item.id === this.props.match.params.categoryid)
                .value(), '[0]', {});
            content = category.descr || '';
        } else if (this.props.match.params.tagname) {
            content = _.get(_(this.props.tagsLookup.data)
                .filter(item => item.tag === decodeURIComponent(this.props.match.params.tagname).toLocaleLowerCase())
                .value(), '[0].descr', '');
        }
        return [
            <Helmet>
                <title>{this.state.helmet}</title>
            </Helmet>,
            <Toolbar
                params={this.props.match.params}
                query={queryString.parse(this.props.location.search)}
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
                {(data.length === 0) && !metadata.isProcessing ?
                    <NoData><h3>Не знайдено заходів за Вашим запитом</h3></NoData> : null}
                {todayEvents.length > 0 ? [
                    <Sticky className="sticky-one" data={data}>
                        <div className="container">
                            <h3>Сьогодні, <strong>{today.format('D MMMM')}</strong></h3>
                            <h4>Події в Івано-Франківську сьогодні</h4>
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
                            <h4>Події в Івано-франківську завтра</h4>
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
