import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import appSettings from '../../constants/aplication';
import {eventTimeObj, placeObj, priceObj} from '../../services/logicHelper';
import AddToCalendar from 'react-add-to-calendar';
import {EventRecurrenceView, EventType} from '../../components/eventAttributes.jsx';

moment.updateLocale('uk', {
    calendar: {
        sameDay: '[Сьогодні] о HH:mm',
        nextDay: '[Завтра] о HH:mm',
        nextWeek: '[Цього тижня] в ddd о HH:mm',
        sameElse: 'ddd о HH:mm'
    }
});

const tooltip = (
    <Tooltip id="tooltip">Поділитись</Tooltip>
);


moment.updateLocale('uk', {
    calendar : {
        sameDay : '[Сьогодні] о HH:mm',
        nextDay : '[Завтра] о HH:mm',
        nextWeek : '[Цього тижня] в ddd о HH:mm',
        sameElse : 'ddd о HH:mm'
    }
});

class EventSmall extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }

    share() {
        const {event} = this.props;
        window.FB.init({
            appId: appSettings.FBPageId,
            cookie: true,
            xfbml: true,
            version: 'v2.5'
        });
        window.FB.ui(
            {
                method: 'share',
                href: `http://ifcityevent.com/event/${event._id}`
            },
            (response) => {
                if (response && response.post_id) {
                    // alert('success');
                } else {
                    // alert('Помилка');
                }
            }
        );
    }

    render() {
        const {event, categories} = this.props;
        const detailedLink = `/event/${event._id}`;
        const categoryName = _(categories)
            .filter(item => item.id === event.category)
            .value();
        const tooltip = (
            <Tooltip id="tooltip">Поділитись</Tooltip>
        );
        const tagsArray = _(_.isArray(event.tags) ? event.tags : (event.tags || '').split(','))
            .map(item => {
                item = item.trim();
                return item ? (
                    <Link to={`/tags/${encodeURIComponent(item)}`}>
                        {`#${item}`}
                    </Link>
                ) : null;
            })
            .value();
        const place = placeObj(event.place);
        const startedBefore = moment(event.start_time).isSameOrBefore(moment(), 'day') && moment(event.end_time).isAfter(moment(), 'day');
        const calendarDate = startedBefore ? moment(event.start_time).format('о HH:mm') : moment(event.start_time).calendar();
        return (
            <div className="event-new-wrapper">
                <div className="event-new">
                    <aside className="image-content">
                        <Link to={detailedLink}>
                            <div className="image-wrapper">
                                <img className="eds-media-card-content__image eds-max-img"
                                     src={_.get(event, 'cover.source', 'http://ifcityevent.com/public/images/event-default.jpg')}/>
                            </div>
                        </Link>
                    </aside>
                    <main className="main-content">
                        <div className="date-side">
                            {startedBefore ? <span className="pre-text">триває з</span> : null}
                            <span className="day">{moment(event.start_time).format('DD')}</span>
                            <span className="month">{moment(event.start_time).format('MMM')}</span>
                        </div>
                        <div className="main-side">
                            <Link to={detailedLink}>
                                <h3>{event.name}</h3>
                            </Link>
                            <span className="place">{calendarDate} · {place.name} {place.location ? `(${place.location})` : null}</span>
                            <span className="price">{priceObj(event.price).str}</span>
                        </div>
                    </main>
                    <div className="footer">
                        <span className="category">
                            {_.get(categoryName, '[0].name', event.category)}
                        </span>
                        <div className="tags">
                            {_.get(tagsArray, '[0]', null)}
                            {_.get(tagsArray, '[1]', null)}
                        </div>
                        <span className="links share">
                            <OverlayTrigger placement="top" overlay={tooltip}>
                              <span className="glyphicon glyphicon-open" aria-hidden="true"
                                    onClick={this.share}></span>
                            </OverlayTrigger>
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}

const sourcesMap = {
    facebook: id => `https://www.facebook.com/events/${id}`
};

class EventFullScreen extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }

    share() {
        const {event} = this.props;
        window.FB.init({
            appId: appSettings.FBPageId,
            cookie: true,
            xfbml: true,
            version: 'v2.5'
        });
        window.FB.ui(
            {
                method: 'share',
                href: `http://ifcityevent.com/event/${event._id}`
            },
            (response) => {
                if (response && response.post_id) {
                    // alert('success');
                } else {
                    // alert('Помилка');
                }
            }
        );
    }

    render() {
        const {event, categories} = this.props;
        const aSiseSize = 7;
        const startedBefore = moment(event.start_time).isBefore(moment(), 'day');
        const place = placeObj(event.place);
        const tagsArray = _(_.isArray(event.tags) ? event.tags : (event.tags || '').split(','))
            .map(item => {
                item = item.trim();
                return item ? (
                    <Link to={`/tags/${encodeURIComponent(item)}`}>
                        {`#${item}`}
                    </Link>
                ) : null;
            })
            .value();
        const cEvent = {
            title: event.name,
            description: event.description ? event.description.substring(0, 500) : 'Немає опису',
            location: 'Івано-Франківськ, ' + (place.location || place.name),
            startTime: event.start_time,
            endTime: event.end_time || event.start_time
        };
        const listItems = [
            { google: 'Google'}
        ];
        return (
            <div className="event-overlap">
                <Row className="event-header">
                    <Col className="col" md={aSiseSize}>
                        <img src={_.get(event, 'cover.source', 'http://ifcityevent.com/public/images/event-default.jpg')}/>
                    </Col>
                    <Col md={12 - aSiseSize}>
                        <div className="date-side">
                            {startedBefore ? <span className="pre-text">триває з</span> : null}
                            <span className="day">{moment(event.start_time).format('DD')}</span>
                            <span className="month">{moment(event.start_time).format('MMM')}</span>
                        </div>
                        <h1>{event.name}</h1>
                        {event.author ?
                            <div className="author">
                                <p>від <a href="#">{event.author.name}</a></p>
                            </div>: null}
                        {event.source ?
                            <div className="source">Джерело:&nbsp;
                                {_.get(sourcesMap, event.source) ?
                                    <a target="_blank" href={sourcesMap[event.source](event.id)}>
                                        {event.source}
                                    </a> :
                                    event.source
                                }
                            </div> : null}
                        <span className="price">{priceObj(event.price).str}</span>
                    </Col>
                </Row>
                <Row className="event-tools">
                    <Col md={aSiseSize}>
                            <span className="links share">
                                <OverlayTrigger placement="top" overlay={tooltip}>
                                  <span className="glyphicon glyphicon-open" aria-hidden="true"
                                        onClick={this.share}></span>
                                </OverlayTrigger>
                                <AddToCalendar buttonLabel="" buttonTemplate={{'calendar': 'left'}} listItems={listItems} event={cEvent}/>
                            </span>
                    </Col>
                    <Col md={12 - aSiseSize}>
                        <a
                            className={`buy-ticket ${this.props.event.ticketUrl ? '' : 'disabled'}`}
                            href={this.props.event.ticketUrl || '#'}
                            target="_blank"
                        >Квитки</a>
                    </Col>
                </Row>
                <Row className="event-main">
                    <Col md={aSiseSize}>
                        <h3>Детальний опис заходу</h3>
                        <p>{event.description}</p>
                        <h3>Теги</h3>
                        <div className="tags">
                            {tagsArray}
                        </div>
                        <h3>Поділитись з друзями</h3>
                        <div className="sharing">
                            <span onClick={this.share}>f</span>
                        </div>
                    </Col>
                    <Col md={12 - aSiseSize}>
                        <h3>Дата і час</h3>
                        <span className="date-full">{eventTimeObj(event).fullTime}</span>
                        <EventRecurrenceView event={event}/>
                        <h3>Локація</h3>
                        <span className="date-full">{place.name}</span>
                        {place.location ? <span className="date-full">{place.location}</span> : null}
                        <h3>Телефон</h3>
                        {event.phone ? <span className="date-full">{event.phone}</span> : null}
                        <h3>Категорія</h3>
                        <EventType category={event.category} categories={categories}/>
                    </Col>
                </Row>
            </div>
        );
    };
}

export { EventSmall, EventFullScreen };
