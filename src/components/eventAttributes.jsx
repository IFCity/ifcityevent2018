import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { eventTimeObj, placeObj, priceObj } from '../services/logicHelper';


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
    return price.isFree || !price.mayBuy ?
        <h2 className="price">{price.str}</h2> :
        <Button className="btn-price" bsStyle="success">
            {price.str}
        </Button>;
};

export const EventPhone = ({phone}) => {
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