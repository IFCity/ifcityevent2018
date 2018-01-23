import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Loading, NoData } from '../../components/tools.jsx';
import { getEventsAction } from '../../actions/eventsActions';
import { getCategoriesAction } from '../../actions/categoriesActions';
import { EventText } from '../events.jsx';


class EventsList extends Component {
    render() {
        const { events } = this.props;
        return (
            <div>
                {events.length ?
                    events.map(event => (
                        <EventText
                            {...this.props}
                            event={event}
                        />
                    ))
                    : <NoData/>}
            </div>
        );
    }
}

class TextParser extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.searchNewEvents();
        this.fetchCategories();
    }

    searchNewEvents() {
        this.props.dispatch(getEventsAction({new: true}));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        return [
            <Row>
                <Col md={12}>
                    <h4>Нові події (додані/змінені сьогодні)</h4>
                </Col>
            </Row>,
            <Row>
                <Col md={12}>
                    <Loading {...metadata} mask={true}>
                        <EventsList
                            events={data}
                            categories={this.props.categories.data}
                        />
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

TextParser.propTypes = {
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

export default connect(mapStateToProps)(TextParser);
