import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { AlsoCards } from '../views/cards.jsx';
import { PopularEventRegion, AttentionEventRegion, PromoEventRegion, TodayEventRegion, FilmEventRegion,
    ChildEventRegion } from '../views/eventRegions.jsx';
import {getMostViewedAction} from "../actions/mostviewedActions";
import {getEventsAction} from "../actions/eventsActions";
import {getChildAction} from "../actions/childActions";
import {getPromoAction} from "../actions/promoActions";
import {getCategoriesAction} from "../actions/categoriesActions";
import {getAttentionAction} from "../actions/attentionActions";


class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        this.fetch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.search(nextProps);
        }
    }

    fetch() {
        this.props.dispatch(getCategoriesAction());

        this.props.dispatch(getAttentionAction());
        this.props.dispatch(getMostViewedAction());
        this.props.dispatch(getChildAction());
        this.props.dispatch(getPromoAction());
        this.props.dispatch(getEventsAction());
    }

    render() {
        return (
            <div className="content-wrapper">
                <AttentionEventRegion
                    {...this.props}
                    hideLinks
                    events={this.props.attention}
                />
                <PopularEventRegion
                    {...this.props}
                    events={this.props.mostviewed}
                />
                <PromoEventRegion
                    {...this.props}
                    events={this.props.promo}
                />
                <TodayEventRegion
                    {...this.props}
                    events={this.props.events}
                />
                <FilmEventRegion
                    {...this.props}
                    events={this.props.film}
                />
                <ChildEventRegion
                    {...this.props}
                    events={this.props.child}
                />
                <AlsoCards/>
            </div>
        );
    }
}

DashboardPage.propTypes = {
    events: PropTypes.object,
    mostviewed: PropTypes.object,
    film: PropTypes.object,
    child: PropTypes.object,
    promo: PropTypes.object,
    attention: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        events: state.events,
        mostviewed: state.mostviewed,
        film: {
            data: state.events.data.filter(item => item.category === 'film'),
        },
        child: state.child,
        promo: {
            data: state.events.data.filter(item => item.category === 'discounts'),
        },
        attention: {
            data: state.events.data.filter(item => item.category === 'attention'),
        },
        categories: state.categories
    };
};

export default connect(mapStateToProps)(DashboardPage);
