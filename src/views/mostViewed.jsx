import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { NoData, Loading } from '../components/tools.jsx';
import { getEventsAction } from '../actions/eventsActions';
import { getMostViewedAction } from '../actions/mostviewedActions';
import { getCategoriesAction } from '../actions/categoriesActions';
import { EventRedesign } from './events.jsx';


const EventSmall = ({event}) => {
    const detailedLink = `/event/${event._id}`;
    return (
        <div className="event event-small">
            <Link to={detailedLink}>
                <img src={_.get(event, 'cover.source', '')}/>
                <h4>{event.name}</h4>
            </Link>
        </div>
    );
};

class MostViewedList extends Component {
    render() {
        let {events, title} = this.props;
        const noData =
            <NoData>
                <h1>Немає подій</h1>
            </NoData>;
        return (
            <div>
                <h3>{title}</h3>
                {events.length ?
                    events.map(event => (
                        <EventSmall
                            {...this.props}
                            event={event}
                        />
                    ))
                    : noData}
            </div>
        );
    }
}

class MostViewed extends Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.fetch(this.props);
        this.fetchCategories();
    }

    fetch(props) {
        if (props.type === 'mostviewed') {
            props.dispatch(getMostViewedAction());
        } else {
            if (!props.eventsParams.tag) {
                props.eventsParams.tag = 'never existing tag';
            }
            props.dispatch(getEventsAction(props.eventsParams));
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.type !== nextProps.type) || (this.props.eventsParams !== nextProps.eventsParams)) {
            this.fetch(nextProps);
        }
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.type === 'mostviewed' ? this.props.mostviewed : this.props.similar;
        return (
            <Loading {...metadata} mask={true}>
                <MostViewedList
                    events={data}
                    categories={this.props.categories.data}
                    {...this.props}
                />
            </Loading>
        );
    }
}


MostViewed.propTypes = {
    similar: PropTypes.object,
    mostviewed: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        similar: state.events,
        mostviewed: state.mostviewed,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(MostViewed);