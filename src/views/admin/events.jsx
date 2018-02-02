import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, ControlLabel, Button, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { slugify } from 'transliteration';
import _ from 'lodash';

import { Loading, NoData } from '../../components/tools.jsx';
import { getEventsAction, removeEventAction, updateEventAction, addEventAction } from '../../actions/eventsActions';
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
import { syncEvent } from '../../api/sync';


class Event extends Component {
    constructor(props) {
        super(props);
        this.removeEvent = this.removeEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.syncEvent = this.syncEvent.bind(this);
    }

    removeEvent() {
        this.props.removeEvent(this.props.event);
    }

    updateEvent() {
        this.props.updateEvent(this.props.event);
    }

    syncEvent() {
        this.props.syncEvent(this.props.event);
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
                    {event.isSync || event.syncId ?
                        <span>
                            <span className="label label-success">
                                {event.isSync ?
                                    `Синхронізовано з IFCity (${event.syncId})`
                                    : `Змінено, не відповідає IFCity (${event.syncId})`
                                }
                            </span>
                            {' '}
                        </span> : null}
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
                    {!event.invalid ?
                        <Button bsStyle="warning" onClick={this.syncEvent} disabled={event.isSync}>
                            Синхронізувати з IFCity
                        </Button>
                        : null
                    }
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
                <ControlLabel>показувати тільки валідні</ControlLabel>
                <br/>
                <input
                    name="isHidden"
                    type="checkbox"
                    checked={this.state.hidden}
                    onChange={this.toggleHidden}/>
                {' '}
                <ControlLabel>показати також приховані</ControlLabel>
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
                <ControlLabel>показати також минулі</ControlLabel>
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
            new: true,
            showModal: false,
            showRemoveModal: false,
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

        this.closeRemoveModal = this.closeRemoveModal.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.applyRemove = this.applyRemove.bind(this);

        this.applySync = this.applySync.bind(this);
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

    removeEvent(event) {
        this.setState({
            showRemoveModal: true,
            event
        });
    }

    closeRemoveModal() {
        this.setState({ showRemoveModal: false });
    }

    applyRemove(event) {
        this.closeRemoveModal();
        this.props.dispatch(removeEventAction(event._id));
    }

    applySync(event) {
        syncEvent({event, categories: this.props.categories.data});
        //this.props.dispatch(syncEventAction(event));
    }

    newEvent() {
        this.setState({
            showModal: true,
            event: {
                name: 'Нова подія',
                category: 'not_set',
                tags: 'ifcityevent',
                isSync: false
            },
            modalTitle: 'Нова подія',
            editType: 'new'
        });
    }

    updateEvent(event) {
        let evt = _.cloneDeep(event);
        evt.isSync = false;
        this.setState({
            showModal: true,
            event: evt,
            modalTitle: `Редагувати "${event.name}"`,
            editType: 'update'
        });
    }

    saveModal(event) {
        this.closeModal();
        if (this.state.editType === 'update') {
            this.props.dispatch(updateEventAction(event));
        } else {
            this.props.dispatch(addEventAction(event));
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
                        <EventsList
                            {...this.props}
                            events={data}
                            categories={this.props.categories.data}
                            updateEvent={this.updateEvent}
                            removeEvent={this.removeEvent}
                            syncEvent={this.applySync}
                        />
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
            />,
            <Dialog
                event={this.state.event}
                show={this.state.showRemoveModal}
                onHide={this.closeRemoveModal}
                onRemove={this.applyRemove}
            />
        ];
    }
}

class Dialog extends Component {
    render() {
        const {onHide, show, event, onRemove} = this.props;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Видалення</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Видалити <strong>{event.name}</strong>?
                </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" onClick={() => onRemove(event)}>Видалити</Button>
                <Button onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
        );
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