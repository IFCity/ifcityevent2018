import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { slugify } from 'transliteration';

import { eventTimeObj, placeObj, priceObj } from '../services/logicHelper';
import appSettings from '../constants/aplication';


export const EventShare = ({event}) => {
    const shareUrl = `${appSettings.appUrl}/event/${event._id}/${slugify(event.name)}`;
    return (
        <div className="share">
            <div className="fb-share-button"
                 data-href={shareUrl}
                 data-layout="button_count">
            </div>
        </div>
    );
};

export const EventPlace = ({place}) => {
    const detailedAddress = placeObj(place).location;
    return (
        <div className="place">
            <span className="glyphicon glyphicon-map-marker" aria-hidden="true"/>&nbsp;
            {placeObj(place).name}
            {detailedAddress ? [<br/>, <span>{detailedAddress}</span>] : null}
        </div>
    );
};

export const EventPrice = ({event}) => {
    const price = priceObj(event.price);
    const btn = event.ticketUrl ?
        <a href={event.ticketUrl} target="_blank">
            купити квиток
        </a> : null;
    return (
        <div>
            <h2 className="price">{price.str}</h2>
            {' '}
            {btn}
        </div>
    );
};

export const EventPhone = ({phone}) => {
    if (!phone) {
        return null;
    }
    return (
        <div className="phone">
            <span className="glyphicon glyphicon-earphone" aria-hidden="true"/>&nbsp;
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

export const EventTime = ({event}) => {
    const fullTime = eventTimeObj(event).fullTime;
    return (
        <div className="date">
            <span className="glyphicon glyphicon-calendar" aria-hidden="true"/>&nbsp;
            {eventTimeObj(event).shortTime}
            {fullTime ? [<br/>, <span>{fullTime}</span>] : null}
        </div>
    );
};
