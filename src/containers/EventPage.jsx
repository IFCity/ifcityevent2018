import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import { EventDefault } from '../views/events.jsx';
import { getEventAction } from '../actions/eventsActions';
import { getCategoriesAction } from '../actions/categoriesActions';
import { Loading } from '../components/tools.jsx';
import { EventJSON } from '../components/eventAttributes.jsx';


class EventPage extends Component {
    constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
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

    fetch(props) {
        props.dispatch(getEventAction(props.match.params.eventid));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.event;
        return (
            <div className="content-wrapper">
                <Row>
                    <Col md={9}>
                        <Loading {...metadata} mask={true}>
                            <EventDefault
                                {...this.props}
                                showShareLinks
                                event={data}
                                categories={this.props.categories.data}
                            />
                        </Loading>
                    </Col>
                    <Col md={3}>
                        <h4>Вас також можуть зацікавити</h4>
                    </Col>
                </Row>
                <EventJSON event={data}/>
            </div>
        );
    }
}

EventPage.propTypes = {
    event: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        event: state.event,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(EventPage);
