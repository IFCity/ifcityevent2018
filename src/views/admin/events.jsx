import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ControlLabel, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { slugify } from 'transliteration';
import _ from 'lodash';

import { Loading, NoData } from '../../components/tools.jsx';
import { getEventsAction, removeEventAction, updateEventAction } from '../../actions/eventsActions';
import { getCategoriesAction } from '../../actions/categoriesActions';
import {
    EventType,
    EventPlace,
    EventTime,
    EventPrice,
    EventPhone,
    EventSource
} from '../../components/eventAttributes.jsx';
import EventForm from './form/eventForm.jsx';


class Event extends Component {
    constructor(props) {
        super(props);
        this.removeEvent = this.removeEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
    }

    removeEvent() {
        this.props.dispatch(removeEventAction(this.props.event._id));
    }

    updateEvent() {
        this.props.updateEvent(this.props.event);
    }

    render() {
        const {event, categories} = this.props;
        const detailedLink = `/event/${event._id}/${slugify(event.name)}`;
        return (
            <tr
                key={event._id}
                className={event.invalid ? 'invalid' : ''}
            >
                <td>
                    <Link to={detailedLink}>
                        <h4>{event.name}</h4>
                    </Link>
                    <EventType category={event.category} categories={categories}/>
                    <EventPlace place={event.place}/>
                    <EventTime event={event}/>
                    <EventPrice event={event}/>
                    <EventPhone phone={event.phone}/>
                    <EventSource event={event}/>
                    {event.isSync ? <span><span className="label label-success">IFCity</span>{' '}</span> : null}
                    {event.hidden ? <span><span className="label label-warning">прихована</span>{' '}</span> : null}
                    {event.invalid ? <span className="label label-danger">невалідна</span> : null}
                </td>
                <td>
                    <img style={{width: '33%'}} src={_.get(event, 'cover.source', '')}/>
                </td>
                <td>
                    <Button bsStyle="success" onClick={this.updateEvent}>Редагувати</Button>
                    <br/>
                    <br/>
                    <Button bsStyle="danger" onClick={this.removeEvent}>Видалити</Button>
                    <br/>
                    <br/>
                    {!event.isSync && !event.invalid ? <Button bsStyle="warning" disabled>Синхронізувати з IFCity</Button> : null}
                </td>
            </tr>
        );
    }
}

class EventsList extends Component {
    render() {
        const { events } = this.props;
        const noData =
            <tr>
                <td>
                    <NoData>
                        <h1>Немає подій</h1>
                    </NoData>
                </td>
            </tr>;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Подія
                        </th>
                        <th>
                            Зображення
                        </th>
                        <th>
                            Редагування / Синхронізація
                        </th>
                    </tr>
                </thead>
                <tbody>
                {events.length ?
                    events.map(event => (
                        <Event
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

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = props.filter;
        this.toggleValid = this.toggleValid.bind(this);
        this.toggleNew = this.toggleNew.bind(this);
        this.toggleHidden = this.toggleHidden.bind(this);
        this.toggleSync = this.toggleSync.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.filter);
    }

    toggleValid() {
        this.setState({
            invalid: !this.state.invalid
        }, () => {
            this.props.onFilter(this.state)
        })
    }

    toggleNew() {
        this.setState({
            new: !this.state.new
        }, () => {
            this.props.onFilter(this.state)
        })
    }

    toggleHidden() {
        this.setState({
            hidden: !this.state.hidden
        }, () => {
            this.props.onFilter(this.state)
        })
    }

    toggleSync() {
        this.setState({
            notSync: !this.state.notSync
        }, () => {
            this.props.onFilter(this.state)
        })
    }

    toggleAll() {
        this.setState({
            all: !this.state.all
        }, () => {
            this.props.onFilter(this.state)
        })
    }

    render() {
        return (
            <div>
                <input
                    name="isNew"
                    type="checkbox"
                    checked={this.state.new}
                    onChange={this.toggleNew}/>
                {' '}
                <ControlLabel>нові</ControlLabel>
                <br/>
                <input
                    name="isValid"
                    type="checkbox"
                    checked={!this.state.invalid}
                    onChange={this.toggleValid}/>
                {' '}
                <ControlLabel>валідні</ControlLabel>
                <br/>
                <input
                    name="isHidden"
                    type="checkbox"
                    checked={this.state.hidden}
                    onChange={this.toggleHidden}/>
                {' '}
                <ControlLabel>приховані</ControlLabel>
                <br/>
                <input
                    name="isFeature"
                    type="checkbox"
                    checked={this.state.notSync}
                    onChange={this.toggleSync}/>
                {' '}
                <ControlLabel>несинхронізовані з IFCity</ControlLabel>
                <br/>
                <input
                    name="isFeature"
                    type="checkbox"
                    checked={this.state.all}
                    onChange={this.toggleAll}/>
                {' '}
                <ControlLabel>минулі</ControlLabel>
            </div>
        )
    }
}

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: false,
            invalid: false,
            notSync: false,
            hidden: false,
            new: false,
            showModal: false,
            event: {},
            modalTitle: 'Нова подія'
        };
        this.search = this.search.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.onFilter = this.onFilter.bind(this);

        this.newEvent = this.newEvent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveModal = this.saveModal.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
    }

    componentDidMount() {
        this.search();
        this.fetchCategories();
    }

    search() {
        this.props.dispatch(getEventsAction(this.state));
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    onFilter(newFilter) {
        this.setState(
            newFilter,
            () => {
                this.search();
            }
        );

    }

    closeModal() {
        this.setState({ showModal: false });
    }

    newEvent() {
        this.setState({
            showModal: true,
            event: {
                name: 'Нова подія'
            },
            modalTitle: 'Нова подія',
            editType: 'new'
        });
    }

    updateEvent(event) {
        this.setState({
            showModal: true,
            event,
            modalTitle: `Редагувати "${event.name}"`,
            editType: 'update'
        });
    }

    saveModal(event) {
        this.closeModal();
        if (this.state.editType === 'update') {
            this.props.dispatch(updateEventAction(event));
        } else {
            //this.props.dispatch(addEventAction(event));
        }
    }

    render() {
        const {data, metadata} = this.props.events;
        return [
            <Row>
                <Col md={4}>
                    <h4>Події</h4>
                </Col>
                <Col md={4}>
                    <Toolbar filter={this.state} onFilter={this.onFilter}/>
                </Col>
                <Col md={4}>
                    <Button bsStyle="success" onClick={this.newEvent}>Додати подію</Button>
                </Col>
            </Row>,
            <Row>
                <Col md={12}>
                    <Loading {...metadata} mask={true}>
                        <EventsList {...this.props} events={data} categories={this.props.categories.data} updateEvent={this.updateEvent}/>
                    </Loading>
                </Col>
            </Row>,
            <EventForm
                title={this.state.modalTitle}
                show={this.state.showModal}
                onHide={this.closeModal}
                onSave={this.saveModal}
                event={this.state.event}
                categories={this.props.categories.data}
            />
        ];
    }
}


Events.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return {
        events: state.events,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(Events);