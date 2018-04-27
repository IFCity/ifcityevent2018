import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash';

import { AlsoCards } from '../views/cards.jsx';
import { PopularEventRegion, AttentionEventRegion, PromoEventRegion, TodayEventRegion, FilmEventRegion,
    ChildEventRegion } from '../views/eventRegions.jsx';
import {getEventsAction} from "../actions/eventsActions";
import {getCategoriesAction} from "../actions/categoriesActions";
import pageTitles from '../constants/pageTitles';


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
        this.props.dispatch(getEventsAction());
    }

    render() {
        return (
            <div className="content-wrapper">
                <Helmet>
                    <title>{pageTitles.dashboard}</title>
                </Helmet>
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
        mostviewed: {
            data: _(state.events.data)
                .filter(item => item.editorChoice)
                .sortBy(item => (item.view_count || 0) * -1)
                .value()
        },
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
