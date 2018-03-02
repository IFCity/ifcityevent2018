import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {slugify} from 'transliteration';
import { Row, Col, ControlLabel } from 'react-bootstrap';

import {eventTimeObj, placeObj, priceObj} from '../services/logicHelper';
import appSettings from '../constants/aplication';
import recurrenceConverter from '../services/daysBitsConverter';


export const EventShare = ({event}) => {
    const shareUrl = `${appSettings.appUrl}/event/${event._id}/${slugify(event.name)}`;
    return (
        <div className="share">
            <div className="views">
                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"/>&nbsp;
                {event.view_count || 0}
            </div>
            <div className="fb-share-button"
                 data-href={shareUrl}
                 data-layout="button_count">
            </div>
        </div>
    );
};

export const EventPlace = ({place, plain}) => {
    if (plain) {
        return placeObj(place).name;
    }
    const detailedAddress = placeObj(place).location;
    return (
        <div className="place">
            <span className="glyphicon glyphicon-map-marker" aria-hidden="true"/>&nbsp;
            <span>{placeObj(place).name}</span>
            {detailedAddress ? [
                <br/>,
                <span className="detailed-address">
                    <span>{detailedAddress}</span>
                </span>] : null}
        </div>
    );
};

export const EventPrice = ({event, plain}) => {
    if (plain) {
        return priceObj(event.price).str;
    }
    const price = priceObj(event.price);
    const btn = event.ticketUrl ?
        <a href={event.ticketUrl} target="_blank">
            (купити квиток)
        </a> : null;
    return (
        <div>
            <p className="price">{price.str} {btn}</p>
        </div>
    );
};

export const EventPhone = ({phone}) => {
    if (!phone) {
        return null;
    }
    return (
        <div className="phone">
            <span className="glyphicon glyphicon-phone" aria-hidden="true"/>&nbsp;
            {phone}
        </div>
    );
};

export const EventType = ({category, categories}) => {
    const categoryName = _(categories)
        .filter(item => item.id === category)
        .value();
    return (
        <div className="event-type">
            <Link to={`/category/${category}`}>{_.get(categoryName, '[0].name', category)}</Link>
        </div>
    );
};

export const EventTime = ({event, plain}) => {
    if (plain) {
        return eventTimeObj(event).shortTime;
    }
    const fullTime = eventTimeObj(event).fullTime;
    return (
        <div className="date">
            <span className="glyphicon glyphicon-calendar" aria-hidden="true"/>&nbsp;
            {eventTimeObj(event).shortTime}
            <EventRecurrenceView event={event}/>
            {fullTime ? [<br/>, <span className="full-time">{fullTime}</span>] : null}
        </div>
    );
};

export const EventJSON = ({event}) => {
    let data = {
        "@context": "http://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: eventTimeObj(event).startTime,
        location: {
            "@type": "Place",
            name: placeObj(event.place || {}).name,
            address: {
                "@type": "PostalAddress",
                streetAddress: placeObj(event.place || {}).location,
                postalCode: "76000",
                addressCountry: "UA"
            }
        },
        image: [
            _.get(event, 'cover.source', '')
        ],
        description: event.description,
        offers: {
            "@type": "Offer",
            url: event.ticketUrl || `${appSettings.appUrl}/event/${event._id}/${slugify(event.name)}`,
            price: (event.price || {}).from,
            priceCurrency: "UAH",
            availability: "http://schema.org/InStock",
            validFrom: eventTimeObj(event).startTime,
        },
        performer: {
            "@type": "PerformingGroup",
            name: "IFCityEvent"
        }
    };
    if (event.end_time) {
        data.endDate = eventTimeObj(event).endTime;
    }
    return <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />;
};

const week = [
    {
        order: 7,
        index: 0,
        shortName: 'нд',
        longName: 'неділі'
    }, {
        order: 1,
        index: 1,
        shortName: 'пн',
        longName: 'понеділка'
    }, {
        order: 2,
        index: 2,
        shortName: 'вт',
        longName: 'вівторка'
    }, {
        order: 3,
        index: 3,
        shortName: 'ср',
        longName: 'середи'
    }, {
        order: 4,
        index: 4,
        shortName: 'чт',
        longName: 'четверга'
    }, {
        order: 5,
        index: 5,
        shortName: 'пт',
        longName: 'пятниці'
    }, {
        order: 6,
        index: 6,
        shortName: 'сб',
        longName: 'суботи'
    }
];

export const EventRecurrenceView = ({event}) => {
    if (!event.weeklyRecurrence) {
        return null;
    }
    const weekDays = recurrenceConverter.bitToDays(event.weeklyRecurrence);
    let result = [];
    _(weekDays)
        .map((item, index) => {
            if (item) {
                result.push(week[index])
            }
        })
        .value();
    result = _(result)
        .orderBy(['order'])
        .map(item => item.longName)
        .value();
    return (
        <span>
            {' '}(кожного(ї) {result.join(', ').replace(/,(?=[^,]*$)/, ' та')}{')'}
        </span>
    );
};

class EventRecurrenceCheckboxes extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleCheck = this.handleCheck.bind(this);
        this.getDays = this.getDays.bind(this);
        this.state = {
            bits: props.weeklyRecurrence,
            days: this.getDays(props.weeklyRecurrence)
        };
    }

    getDays(weeklyRecurrence) {
        const weekDays = recurrenceConverter.bitToDays(weeklyRecurrence);
        let result = [];
        _(weekDays)
            .map((item, index) => {
                result.push({
                    ...week[index],
                    checked: item
                });
            })
            .value();
        result = _(result)
            .orderBy(['order'])
            .value();
        return result;
    }

    handleCheck(item) {
        let days = _(this.state.days)
            .orderBy(['index'])
            .map(item => item.checked)
            .value();
        days[item.index] = !item.checked;
        const bits = recurrenceConverter.daysToBit(days);
        this.setState({
            bits: bits,
            days: this.getDays(bits)
        });
        this.props.onChange(bits);
    }

    render() {
        return (
            <Row>
                {_(this.state.days)
                    .map(item => {
                        return (
                            <Col md={1}>
                                <input
                                    name={`day${item.index}`}
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={() => this.handleCheck(item)}
                                />
                                {' '}
                                <ControlLabel>{item.shortName}</ControlLabel>
                            </Col>
                        )
                    })
                    .value()
                }
            </Row>
        )
    }
}

export { EventRecurrenceCheckboxes };

const sourcesMap = {
    facebook: id => `https://www.facebook.com/events/${id}`
};

export const EventSource = ({event}) => {
    if (!event.source) {
        return null;
    }
    return (
        <div className="source">
            <p>Джерело:&nbsp;
                {_.get(sourcesMap, event.source) ?
                    <a target="_blank" href={sourcesMap[event.source](event.id)}>
                        {event.source}
                    </a> :
                    event.source
                }
            </p>
        </div>
    );
};

export const EventMetadata = ({event}) => {
    if (!event.metadata) {
        return null;
    }
    const formatValues = value => {
        if (!_.isArray(value)) {
            return value;
        }
        const items = _(value)
            .map(item => {
                return (
                    <Row>
                        <Col md={3} className="subtitle" style={{paddingLeft: 0}}>
                            {item.name}
                        </Col>
                        <Col md={9} style={{paddingRight: 0}}>
                            {formatValues(item.value)}
                        </Col>
                    </Row>
                );
            })
            .value();
        return (
            <div>
                {items}
            </div>
        )
    };
    const items = _(event.metadata)
        .map(item => {
            return (
                <Row>
                    <Col md={3} className="title" style={{paddingLeft: 0}}>
                        {item.name}
                    </Col>
                    <Col md={9} style={{paddingRight: 0}}>
                        {formatValues(item.value)}
                    </Col>
                </Row>
            );
        })
        .value();
    return (
        <div className="metadata">
            {items}
        </div>
    );
};

export const EventTags = ({tags}) => {
    if (!tags) {
        return null;
    }
    const tagsArray = _(_.isArray(tags) ? tags : tags.split(','))
        .map(item => {
            item = item.trim();
            return (
                <Link to={`/tags/${encodeURIComponent(item)}`}>
                    {`#${item}`}
                </Link>
            );
        })
        .value();
    return (
        <div className="tags">
            {tagsArray}
        </div>
    );
};
