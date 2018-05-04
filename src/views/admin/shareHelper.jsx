import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Loading, NoData } from '../../components/tools.jsx';
import { getEventsAction } from '../../actions/eventsActions';
import { getCategoriesAction } from '../../actions/categoriesActions';
import { EventText } from '../events.jsx';



const isTomorrow = event =>
    (
        moment(event.startCalcDate).isSame(moment().add(1, 'days'), 'day') ||
        (
            moment(event.startCalcDate).isSameOrBefore(moment().add(1, 'days'), 'day') &&
            moment(event.end_time).isSameOrAfter(moment().add(1, 'days'), 'day')
        )
    );

class EventsList extends Component {
    render() {
        const { events, categories } = this.props;
        const categoryEvents = _(categories)
            .map(category => <CategoryEvents category={category} events={events}/>)
            .value();
        return (
            <div>
                {categoryEvents}
            </div>
        );
    }
}

class CategoryEvents extends Component {
    render() {
        const { events, category } = this.props;
        const categoryEvents = _(events)
            .filter(item => item.category === category.id)
            .map(event =>
                <EventText
                    {...this.props}
                    event={event}
                />
            )
            .value();
        return (
            <div>
                <h5>{category.name}</h5>
                {categoryEvents}
            </div>
        );
    }
}

class ShareHelper extends Component {
    constructor(props) {
        super(props);
        this.searchEvents = this.searchEvents.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount() {
        this.searchEvents();
        this.fetchCategories();
    }

    searchEvents() {
        this.props.dispatch(getEventsAction());
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        let tomorrowEvents = [];
        _(data).map(event => {
            if (isTomorrow(event)) {
                tomorrowEvents.push(event);
            }
        })
            .value();
        return [
            <Row>
                <Col md={12}>
                    <h4>Завтрашні події</h4>
                </Col>
            </Row>,
            <Row>
                <Col md={12}>
                    <Loading {...metadata} mask={true}>
                        <EventsList
                            events={tomorrowEvents}
                            categories={this.props.categories.data}
                        />
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

ShareHelper.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        events: state.events,
        categories: state.categories,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(ShareHelper);
