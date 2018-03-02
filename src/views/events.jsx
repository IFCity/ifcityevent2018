import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import {slugify} from 'transliteration';

import {getEventsAction} from '../actions/eventsActions';
import {getCategoriesAction} from '../actions/categoriesActions';
import {NoData, Loading} from '../components/tools.jsx';
import {
    EventTime,
    EventPlace,
    EventPrice,
    EventPhone,
    EventType,
    EventShare,
    EventSource,
    EventMetadata,
    EventTags
} from '../components/eventAttributes.jsx';
import Toolbar from '../components/Toolbar.jsx';
import appSettings from '../constants/aplication';
import {placeObj, priceObj} from '../services/logicHelper';


export const EventDefault = (props) => {
    const {event, even, categories, showShareLinks, deepLinking, divider} = props;
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
            <EventTags tags={event.tags}/>
            {showShareLinks ? <EventShare event={event}/> : null}
            <p className={deepLinking ? 'description wrap' : 'description'}>{event.description}</p>
            {deepLinking ? <a className="detailed" href={detailedLink}>...показати більше</a> : null}
        </Col>;
    const cover =
        <Col md={6}>
            <img src={_.get(event, 'cover.source', '')}/>
        </Col>;
    const result = [
        divider,
        <Row
            key={event._id}
            className={`event-default event-default-${even ? 'even' : 'odd'}`}
        >
            {even ? [info, cover] : [cover, info]}
        </Row>
    ];
    return divider ? result : result[1];
};

export const EventRedesign = (props) => {
    const {event, even, categories, showShareLinks, deepLinking, divider} = props;
    const detailedLink = `/event/${event._id}/${slugify(event.name)}`;
    return (
        <div className="event-new-wrapper">
            <div className="event-new">
                <aside className="image-content">
                    <a href={detailedLink} className="">
                        <div className="image-wrapper">
                            <img className="eds-media-card-content__image eds-max-img" src={_.get(event, 'cover.source', '')}/>
                        </div>
                    </a>
                </aside>
                <main className="main-content">
                    <div className="date-side">
                        <span className="day">{moment(event.startCalcDate).format('DD')}</span>
                        <span className="month">{moment(event.startCalcDate).format('MMM')}</span>
                    </div>
                    <div className="main-side">
                        <h3>{event.name}</h3>
                        <span className="place">{placeObj(event.place).name}</span>
                        <span className="price">{priceObj(event.price).str}</span>
                    </div>
                </main>
            </div>
        </div>
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

const isToday = event => moment(event.startCalcDate).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

const isTomorrow = event => moment(event.startCalcDate).format('YYYY-MM-DD') === moment().add(1, 'days').format('YYYY-MM-DD');

const isLater = event => moment(event.startCalcDate).format('YYYY-MM-DD') > moment().add(1, 'days').format('YYYY-MM-DD');


class EventsList extends Component {
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
                            <EventRedesign
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
        this.getParams = this.getParams.bind(this);
    }

    componentDidMount() {
        this.search(this.getParams(this.props.match.params));
        this.fetchCategories();
    }

    getParams(params) {
        let result = {};
        if (params.categoryid) {
            result.category = params.categoryid;
        }
        if (params.tagname) {
            result.tag = decodeURIComponent(params.tagname);
        }
        if (params.holiday) {
            result[params.holiday] = true;
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        if (typeof (window) !== 'undefined') {
            window.scrollTo(0, 0);
        }
        if ((this.props.match.params.categoryid !== nextProps.match.params.categoryid) ||
            (this.props.match.params.tagname !== nextProps.match.params.tagname) ||
            (this.props.match.params.holiday !== nextProps.match.params.holiday)) {
            this.search(this.getParams(nextProps.match.params));
        }
    }

    search(params) {
        params.page = 1;
        this.props.dispatch(getEventsAction(params));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        return [
            <Toolbar path={this.props.match.params.holiday}/>,
            <Loading {...metadata} mask={true}>
                {this.props.match.params.tagname ?
                    <h3>Пошук за тегом: {decodeURIComponent(this.props.match.params.tagname)}</h3> : null}
                <EventsList
                    events={data}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                    showDivider={!this.props.match.params.holiday}
                    title={!!this.props.match.params.holiday ? `Вікенд (${moment().day(6).format('LL')} - ${moment().day(7).format('LL')})` : null}
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
