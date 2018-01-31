import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { slugify } from 'transliteration';
import { connect } from 'react-redux';

import { NoData, Loading } from '../components/tools.jsx';
import { getMostViewedAction } from '../actions/mostviewedActions';
import { getCategoriesAction } from '../actions/categoriesActions';


const EventSmall = ({event}) => {
    const detailedLink = `/event/${event._id}/${slugify(event.name)}`;
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
        let {events} = this.props;
        const noData =
            <NoData>
                <h1>Немає подій</h1>
            </NoData>;
        return (
            <div>
                <h3>Популярні події</h3>
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
        this.fetch();
        this.fetchCategories();
    }

    fetch() {
        this.props.dispatch(getMostViewedAction());
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.mostviewed;
        return (
            <Loading {...metadata} mask={true}>
                <MostViewedList
                    events={data}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
            </Loading>
        );
    }
}


MostViewed.propTypes = {
    mostviewed: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        mostviewed: state.mostviewed,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(MostViewed);