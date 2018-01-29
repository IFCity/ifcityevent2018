import _ from 'lodash';

import initialState from './initialState';
import * as types from '../constants/actionTypes';
import {mapMetadataRequest, mapMetadataSuccess, mapMetadataFailure} from '../services/reduserHelper';


export default function (state = initialState.events, action) {
    switch (action.type) {
        case types.GET_AGGREGATION_REQUEST:
            return mapMetadataRequest(state);
        case types.GET_AGGREGATION_SUCCESS:
            return mapMetadataSuccess(state, action, 'aggregation');
        case types.GET_AGGREGATION_FAILURE:
            return mapMetadataFailure(state, action, 'aggregation');

        case types.SAVE_EVENTS_SUCCESS:
            return { ...state, data: [] };
        case types.SAVE_EVENTS_FAILURE:
            return mapMetadataFailure(state, action, 'aggregation');

        case types.TOGGLE_VALID:
            const newValidData = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.id) {
                        item.invalid = !item.invalid;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newValidData };
        case types.TOGGLE_HIDDEN:
            const newHiddenData = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.id) {
                        item.hidden = !item.hidden;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newHiddenData };
        case types.TOGGLE_INTEGRATE:
            const newIntegrateData = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.id) {
                        item.integrate = !item.integrate;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newIntegrateData };
        case types.SET_MIN_PRICE:
            const newMinPrice = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.price = item.price || {};
                        item.price.from = action.payload.value;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newMinPrice };
        case types.SET_MAX_PRICE:
            const newMaxPrice = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.price = item.price || {};
                        item.price.to = action.payload.value;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newMaxPrice };
        case types.SET_CATEGORY:
            const newCategory = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.category = action.payload.value;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newCategory };

        case types.SET_PHONE:
            const newPhone = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.phone = action.payload.value;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newPhone };

        case types.SET_TICKET_URL:
            const newTicketUrl = _(_.cloneDeep(state.data))
                .map(item => {
                    if (item.id === action.payload.id) {
                        item.ticketUrl = action.payload.value;
                    }
                    return item;
                })
                .value();
            return { ...state, data: newTicketUrl };

        default:
            return state;
    }
}