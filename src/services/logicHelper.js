import moment from 'moment';


moment.locale('uk');

export const eventOneTimeStr = (eventTime) => {
    return moment(eventTime).format('LL о LT');
};

export const eventSimpleOneTimeStr = (eventTime) => {
    return moment(eventTime).format('D MMM YYYY о LT');
};

export const eventOneTimeStrFull = (eventTime) => {
    return moment(eventTime).format('D MMM YYYY, LT');
};

export const eventSameDateStr = ({start_time, end_time}) => {
    return `${moment(start_time).format('D MMM YYYY, LT')} - ${moment(end_time).format('LT')}`;
};

export const eventDefaultRangeStr = ({start_time, end_time}) => {
    return `${moment(start_time).format('D MMM YYYY, LT')} - ${moment(end_time).format('D MMM, LT')}`;
};

export const eventSimpleRangeStr = ({start_time, end_time}) => {
    return `${moment(start_time).format('D MMM')} - ${moment(end_time).format('D MMMM')}`;
};

export const eventTimeObj = ({start_time, end_time}) => {
    if (!start_time) {
        return {
            shortTime: 'Дата події не вказана',
            fullTime:  'Дата події не вказана'
        };
    }
    if (!end_time) {
        return {
            startTime: moment(start_time).format('YYYY-MM-DDThh:mm'),
            shortTime: eventOneTimeStr(start_time),
            fullTime: eventOneTimeStrFull(start_time)
        };
    }
    if (moment(start_time).format('LL') === moment(end_time).format('LL')) {
        return {
            startTime: moment(start_time).format('YYYY-MM-DDThh:mm'),
            endTime: moment(end_time).format('YYYY-MM-DDThh:mm'),
            shortTime: eventSimpleOneTimeStr(start_time),
            fullTime: eventSameDateStr({start_time, end_time})
        };
    }
    return {
        startTime: moment(start_time).format('YYYY-MM-DDThh:mm'),
        endTime: moment(end_time).format('YYYY-MM-DDThh:mm'),
        shortTime: eventSimpleRangeStr({start_time, end_time}),
        fullTime: eventDefaultRangeStr({start_time, end_time})
    };
};


const noPlace = 'Локація не вказана';
const noPrice = 'Вартість не вказана';
const freePrice = 'Безкоштовно';

export const placeLocation = (location) => {
    if (!location) {
        return '';
    }
    return location.street;
};

export const placeObj = (place) => {
    let result = {
        name: '',
        location: ''
    };

    if (!place) {
        result.name = noPlace;
        return result;
    }

    if (!place.name) {
        if (!place.location) {
            result.name = noPlace;
            return result;
        }
        result.name = placeLocation(place.location);
        return result;
    }

    result.name = place.name;
    result.location = placeLocation(place.location);
    return result;
};

export const priceObj = (price) => {
    let result = {
        str: '',
        mayBuy: false,
        isFree: false
    };

    if (price && price.text) {
        result.str = price.text;
        return result;
    }

    if (!price || (!price.from && !price.to)) {
        result.str = noPrice;
        return result;
    }

    if (price.from) {
        if (!price.to) {
            result.isFree = parseInt(price.from, 10) === 0;
            result.str = result.isFree ? freePrice : `${price.from} грн.`;
            result.mayBuy = true;
            return result;
        }
        result.str = `${price.from} - ${price.to} грн.`;
        result.mayBuy = true;
        return result;
    }

    result.str = `до ${price.to}`;
    result.mayBuy = true;
    return result;
};
