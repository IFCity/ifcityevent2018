import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col} from 'react-bootstrap';

import { CategoryDropdown } from '../../../components/formElements.jsx';
import { EventRecurrenceCheckboxes } from '../../../components/eventAttributes.jsx';


const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};

class DaysRepeat extends Component {
    render() {

    }
}

class EventForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleWeeklyRecurrenceChange = this.handleWeeklyRecurrenceChange.bind(this);
        this.state = {
            event: props.event
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({event: nextProps.event});
    }

    handleSave() {
        this.props.onSave(this.state.event);
    }

    handleNameChange(e) {
        let event = this.state.event;
        event.name = e.target.value;
        this.setState({event: event});
    }

    handleWeeklyRecurrenceChange(bits) {
        let event = this.state.event;
        event.weeklyRecurrence = bits;
        this.setState({event: event});
    }

    render() {
        const {show, onHide, title, categories} = this.props;
        const event = this.state.event;
        return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title || 'Вікно'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FieldGroup
                            id="name"
                            type="text"
                            label="Назва"
                            placeholder="Введіть назву події"
                            value={event.name}
                            onChange={this.handleNameChange}
                        />
                        <FieldGroup
                            id="image"
                            type="text"
                            label="Зображення"
                            placeholder="Вставте лінк на зображення"
                            value={_.get(event, 'cover.source', '')}
                        />
                        <FormGroup controlId="description">
                            <ControlLabel>Опис</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Введіть опис події"
                                value={event.description}
                                rows={5}
                            />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FieldGroup
                                    id="startTime"
                                    type="text"
                                    label="Дата від"
                                    placeholder="Введіть дату і час початку події"
                                    value={event.start_time}
                                />
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="endTime"
                                    type="text"
                                    label="Дата до"
                                    placeholder="Введіть дату і час закінчення події"
                                    value={event.end_time}
                                />
                            </Col>
                        </Row>
                        <ControlLabel>Тижнева повторюваність</ControlLabel>
                        <EventRecurrenceCheckboxes
                            weeklyRecurrence={event.weeklyRecurrence}
                            onChange={this.handleWeeklyRecurrenceChange}
                        />
                        <Row>
                            <Col md={6}>
                                <FieldGroup
                                    id="phone"
                                    type="text"
                                    label="Телефон"
                                    placeholder="Введіть телефон"
                                    value={event.phone}
                                />
                            </Col>
                            <Col md={6}>
                                <ControlLabel>Категорія</ControlLabel>
                                <CategoryDropdown categories={categories} event={event}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FieldGroup
                                    id="priceFrom"
                                    type="text"
                                    label="Ціна від (грн.)"
                                    placeholder="Введіть найменшу ціну в грн."
                                    value={_.get(event, 'price.from', '')}
                                />
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="priceTo"
                                    type="text"
                                    label="Ціна до (грн.)"
                                    placeholder="Введіть найбільшу ціну в грн."
                                    value={_.get(event, 'price.to', '')}
                                />
                            </Col>
                        </Row>
                        <HelpBlock>
                            <li>ціна невідома - залиште поля порожніми</li>
                            <li>захід безкоштовний - введіть "0" в поле "Ціна від"</li>
                            <li>одна ціна - введіть значення тільки в полі "Ціна від"</li>
                        </HelpBlock>
                        <FieldGroup
                            id="ticketUrl"
                            type="text"
                            label="Купити квиток"
                            placeholder="Вставте посилання на сайт для купівлі квитка"
                            value={event.ticketUrl}
                        />
                    </form>
                    <Row>
                        <Col md={6}>
                            <FieldGroup
                                id="place"
                                type="text"
                                label="Місце проведення (назва)"
                                placeholder="Введіть назву місця проведення заходу, або адресу якщо назви немає"
                                value={_.get(event, 'place.name', '')}
                            />
                        </Col>
                        <Col md={6}>
                            <FieldGroup
                                id="address"
                                type="text"
                                label="Детальна адреса місця проведення"
                                placeholder="Введіть детальну адресу місця проведення заходу"
                                value={_.get(event, 'place.location.street', '')}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <ControlLabel>Валідна подія</ControlLabel>
                            {' '}
                            <input
                                name="isValid"
                                type="checkbox"
                                checked={!event.invalid}/>
                        </Col>
                        <Col md={6}>
                            <ControlLabel>Прихована подія</ControlLabel>
                            {' '}
                            <input
                                name="isHidden"
                                type="checkbox"
                                checked={event.hidden}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.handleSave}>Зберегти</Button>
                    <Button onClick={onHide}>Закрити</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EventForm;