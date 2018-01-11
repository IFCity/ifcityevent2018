import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

import { aggregateFBAction } from '../../actions/aggregationActions';
import { Loading, NoData } from '../../components/tools.jsx';


const EventToAggregate = (props) => {
    const { event } = props;
    return (
        <Row
            key={event._id}
            className="event-to-aggregate"
        >
            <Col xs={12}>
                {event.name}
            </Col>
        </Row>
    );
};

class AggregationList extends Component {
    render() {
        const {events} = this.props;
        const noData =
            <NoData>
                <h1>Нових подій не знайдено</h1>
            </NoData>;
        return (
            <div>
                {events.length ?
                    events.map((event, index) => (
                        <EventToAggregate
                            {...this.props}
                            event={event}
                        />
                    ))
                    : noData}
            </div>
        );
    }
}

class Aggregation extends Component {
    constructor(props) {
        super(props);
        this.doAggregate = this.doAggregate.bind(this);
    }

    doAggregate() {
        this.props.dispatch(aggregateFBAction(this.props.authorization.data.authData.accessToken));
    }

    componentDidMount() {
        this.doAggregate();
    }

    render() {
        const {data, metadata} = this.props.aggregation;
        return [
            <Row>
                <Col xs={12}>
                    <h4>Агрегація з Facebook</h4>
                </Col>
            </Row>,
            <Row>
                <Col xs={12}>
                    <Button bsStyle="success" onClick={this.doAggregate}>Перечитати Facebook-події</Button>
                    &nbsp;
                    <Button bsStyle="danger" onClick={this.doAggregate}>Записати в базу</Button>
                </Col>
            </Row>,
            <Row>
                <Col xs={12}>
                    <Loading {...metadata} mask={true}>
                        <AggregationList events={data}/>
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Aggregation.propTypes = {
    aggregation: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        aggregation: state.aggregation,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(Aggregation);
