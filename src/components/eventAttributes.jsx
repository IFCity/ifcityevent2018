import React from 'react';
import { eventTimeStr, placeObj, priceObj } from '../services/logicHelper';
import { Button } from 'react-bootstrap';


export const EventTime = ({event}) => {
    return (
        <div className="date">
            <span className="glyphicon glyphicon-calendar" aria-hidden="true"/>&nbsp;
            {eventTimeStr(event)}
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
    return price.isFree ?
        <h2 className="price">{price.str}</h2> :
        <Button className="btn-price" bsStyle="success" disabled={!price.mayBuy}>
            {price.str}
        </Button>;
};
