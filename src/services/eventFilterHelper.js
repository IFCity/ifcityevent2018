import moment from 'moment';
import _ from 'lodash';

export const isTomorrow = event =>
    (
        moment(event.startCalcDate).isSame(moment().add(1, 'days'), 'day') ||
        (
            moment(event.startCalcDate).isSameOrBefore(moment().add(1, 'days'), 'day') &&
            moment(event.end_time).isSameOrAfter(moment().add(1, 'days'), 'day')
        )
    );

export const filterByTimeOnly = events =>
    _(events)
        .orderBy(event => moment(event.start_time).format('HH:mm'))
        .value();

export const getTomorrowEvents = events =>
    _(events)
        .filter(event => isTomorrow(event))
        .orderBy(event => moment(event.start_time).format('HH:mm'))
        .value();