import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getEventAction, getEventsAction, incViewEventAction} from '../actions/eventsActions';
import {getCategoriesAction} from '../actions/categoriesActions';
import {Loading} from '../components/tools.jsx';
import {EventJSON} from '../components/eventAttributes.jsx';
import {EventFullScreen} from '../views/event/event.jsx';
import { RelatedEventRegion } from '../views/eventRegions.jsx';


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.filterRelatedEvents = this.filterRelatedEvents.bind(this);
    }

    componentDidMount() {
        this.fetch(this.props);
        this.fetchCategories();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.eventid !== nextProps.match.params.eventid) {
            this.fetch(nextProps);
        }
    }

    filterRelatedEvents(data) {
        let result = [];
        if (data && data.tags) {
            const tag = data.tags.split(',')[0].trim().toLocaleUpperCase();
            result = this.props.events.data.filter(item => {
                if (item._id === data._id) {
                    return false;
                }
                return (item.tags || '').toLocaleUpperCase().includes(tag);
            });
        }
        return result;
    }

    fetch(props) {
        props.dispatch(getEventsAction());
        props.dispatch(getEventAction(props.match.params.eventid));
        props.dispatch(incViewEventAction(props.match.params.eventid));
        this.filterRelatedEvents(props.event.data);
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.event;
        const relatedEvents = this.filterRelatedEvents(data);
        return (
            <div className="content-wrapper">
                <Loading {...metadata} mask={true}>
                    <EventFullScreen
                        {...this.props}
                        showShareLinks
                        event={data}
                        categories={this.props.categories.data}
                    />
                    <RelatedEventRegion
                        {...this.props}
                        hideLinks
                        noLimit
                        events={{
                            data: relatedEvents,
                            metadata
                        }}
                    />
                </Loading>
                <EventJSON event={data}/>
            </div>
        );
    }
}

EventPage.propTypes = {
    event: PropTypes.object,
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        event: state.event,
        events: state.events,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(EventPage);
