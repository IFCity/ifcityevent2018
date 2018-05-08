import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {Loading, NoData} from '../../components/tools.jsx';
import {getEventsAction} from '../../actions/eventsActions';
import {getCategoriesAction} from '../../actions/categoriesActions';
import {EventText} from '../events.jsx';
import {getTomorrowEvents} from '../../services/eventFilterHelper';


class EventsList extends Component {
    render() {
        const {events, categories} = this.props;
        const exibitionEvents = _(events)
            .filter(item => item.category === 'exibition')
            .value();
        const allEvents = _(events)
            .filter(item => (item.category !== 'exibition') && (item.category !== 'film'))
            .value();
        return (
            <textarea className="copy-text">
                {`${GroupEvents({title: "Події", events: allEvents})}${GroupEvents({title: "Виставки", events: exibitionEvents})}`}
            </textarea>
        );
    }
}

const GroupEvents = (props) => {
    const {events, title} = props;
    let text = '';
    _(events)
        .map(event => {
            text = text +
                EventText({
                    ...props,
                    event
                });
        })
        .value();
    return `${title}\n${text}`;
};

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
        let tomorrowEvents = getTomorrowEvents(data);
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
