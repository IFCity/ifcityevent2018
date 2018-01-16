import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    aggregateFBAction,
    toggleValidAction,
    toggleIntegrateAction,
    setMinPriceAction,
    setMaxPriceAction,
    setCategoryAction
} from '../../actions/aggregationActions';
import { saveEventsAction } from '../../actions/eventsActions';
import { getCategoriesAction } from '../../actions/categoriesActions';
import { Loading, NoData } from '../../components/tools.jsx';
import { CategoryDropdown } from '../../components/formElements.jsx';



class EventToAggregate extends Component {
    constructor(props) {
        super(props);
        this.toggleValid = this.toggleValid.bind(this);
        this.toggleIntegrate = this.toggleIntegrate.bind(this);
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
        this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleMinPriceChange(e) {
        this.props.dispatch(setMinPriceAction({id: this.props.event.id, value: e.target.value}));
    }

    handleMaxPriceChange(e) {
        this.props.dispatch(setMaxPriceAction({id: this.props.event.id, value: e.target.value}));
    }

    toggleValid() {
        this.props.dispatch(toggleValidAction(this.props.event.id));
    }

    toggleIntegrate() {
        this.props.dispatch(toggleIntegrateAction(this.props.event.id));
    }

    handleCategoryChange(category) {
        this.props.dispatch(setCategoryAction({id: this.props.event.id, value: category}));
    }

    render() {
        const {event} = this.props;
        console.log(this.props);
        return (
            <tr>
                <td>
                    <div className="image">
                        <img src={_.get(event, 'cover.source', '')}/>
                    </div>
                </td>
                <td>
                    <h5>{event.name}</h5>
                    Організовує <span className="author">{_.get(event, 'author.name', 'не вказано')}</span>
                    {` в(на) `}
                    <span className="place">{_.get(event, 'place.name', 'не вказано')}</span>
                    <p><strong>ID: {event.id}</strong></p>
                    <p>
                        <a target="_blank" href={`https://www.facebook.com/events/${event.id}`}>Перейти на Facebook</a>
                    </p>
                </td>
                <td>
                    {moment(event.start_time).format('YYYY-MM-DD HH:mm')}&nbsp;
                    {event.end_time ? ` - ${moment(event.end_time).format('YYYY-MM-DD HH:mm')}` : ''}
                </td>
                <td>
                    <FormGroup
                        controlId="praice"
                    >
                        <ControlLabel>Від</ControlLabel>
                        <FormControl
                            type="text"
                            value={_.get(event, 'price.from', '')}
                            placeholder="min"
                            onChange={this.handleMinPriceChange}
                        />
                        <ControlLabel>До</ControlLabel>
                        <FormControl
                            type="text"
                            value={_.get(event, 'price.to', '')}
                            placeholder="max"
                            onChange={this.handleMaxPriceChange}
                        />
                    </FormGroup>
                </td>
                <td>
                    <CategoryDropdown
                        event={event}
                        categories={this.props.categories.data}
                        onChange={this.handleCategoryChange}
                    />
                </td>
                <td>
                    <input
                        name="isValid"
                        type="checkbox"
                        checked={!this.props.event.invalid}
                        onChange={this.toggleValid}/>
                </td>
                <td>
                    <input
                        name="readyToSync"
                        type="checkbox"
                        checked={this.props.event.integrate}
                        onChange={this.toggleIntegrate}/>
                </td>
            </tr>
        );
    }
}

class AggregationList extends Component {
    render() {
        const {events} = this.props;
        const noData =
            <tr>
                <td>
                    <NoData>
                        <h1>Нових подій не знайдено</h1>
                    </NoData>
                </td>
            </tr>;
        return (
            <table className="table table-admin-events">
                <thead>
                <tr>
                    <th>
                        Зображення
                    </th>
                    <th>
                        Основні дані
                    </th>
                    <th>
                        Дата
                    </th>
                    <th>
                        Ціна
                    </th>
                    <th>
                        Категорія
                    </th>
                    <th>
                        Валідність
                    </th>
                    <th>
                        IFCity синхронізація
                    </th>
                </tr>
                </thead>
                <tbody>
                    {events.length ?
                        events.map((event, index) => (
                            <EventToAggregate
                                {...this.props}
                                event={event}
                            />
                        ))
                        : noData}
                </tbody>
            </table>
        );
    }
}

class Aggregation extends Component {
    constructor(props) {
        super(props);
        this.doAggregate = this.doAggregate.bind(this);
        this.doSave = this.doSave.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    doAggregate() {
        this.props.dispatch(aggregateFBAction(this.props.authorization.data.authData.accessToken));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    doSave() {
        this.props.dispatch(saveEventsAction({
            token: this.props.authorization.data.authData.accessToken,
            events: this.props.aggregation.data
        }));
    }

    componentDidMount() {
        this.doAggregate();
        this.fetchCategories();
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
                    <Button bsStyle="danger" onClick={this.doSave}>Записати в базу</Button>
                </Col>
            </Row>,
            <Row>
                <Col xs={12}>
                    <Loading {...metadata} mask={true}>
                        <AggregationList
                            {...this.props}
                            events={data}
                        />
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Aggregation.propTypes = {
    aggregation: PropTypes.object,
    categories: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        aggregation: state.aggregation,
        categories: state.categories,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(Aggregation);
