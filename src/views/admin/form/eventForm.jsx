import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import DateTime from 'react-datetime';

import {CategoryDropdown} from '../../../components/formElements.jsx';
import {EventRecurrenceCheckboxes} from '../../../components/eventAttributes.jsx';


const FieldGroup = ({id, label, help, ...props}) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel className="required">{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
};

class EventForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSave = this.handleSave.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleWeeklyRecurrenceChange = this.handleWeeklyRecurrenceChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleEndTimeClearChange = this.handleEndTimeClearChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleTicketUrlChange = this.handleTicketUrlChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
        this.handleMinPriceChange = this.handleMinPriceChange.bind(this);
        this.handleMaxPriceChange = this.handleMaxPriceChange.bind(this);
        this.handleTextPriceChange = this.handleTextPriceChange.bind(this);
        this.handleInvalidChange = this.handleInvalidChange.bind(this);
        this.handleHiddenChange = this.handleHiddenChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleMetadataChange = this.handleMetadataChange.bind(this);
        this.handleEditorChoiceChange = this.handleEditorChoiceChange.bind(this);

        this.state = {
            event: _.cloneDeep(props.event)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            event: _.cloneDeep(nextProps.event)
        });
    }

    handleSave() {
        console.log(this.state.event);
        this.props.onSave(this.state.event);
    }

    handleNameChange(e) {
        let event = this.state.event;
        event.name = e.target.value;
        this.setState({event: event});
    }

    handleImageChange(e) {
        let event = this.state.event;
        event.cover = {source: e.target.value};
        this.setState({event: event});
    }

    handleDescriptionChange(e) {
        let event = this.state.event;
        event.description = e.target.value;
        this.setState({event: event});
    }

    handleMetadataChange(e) {
        let event = this.state.event;
        const oldValue = event.metadata;
        try {
            event.metadata = JSON.parse(e.target.value);
        } catch (e) {
            console.warn(e);
            event.metadata = oldValue;
        }
        this.setState({event: event});
    }

    handleWeeklyRecurrenceChange(bits) {
        let event = this.state.event;
        event.weeklyRecurrence = bits;
        this.setState({event: event});
    }

    handleStartTimeChange(t) {
        let event = this.state.event;
        let prevValue = event.start_time;
        try {
            event.start_time = t.format('YYYY-MM-DDTHH:mm:00ZZ');
        } catch (e) {
            console.warn(e);
            event.start_time = prevValue;
        }
        this.setState({event: event});
    }

    handleEndTimeChange(t) {
        let event = this.state.event;
        let prevValue = event.end_time;
        try {
            event.end_time = t.format('YYYY-MM-DDTHH:mm:00ZZ');
        } catch (e) {
            console.warn(e);
            event.end_time = prevValue;
        }
        this.setState({event: event});
    }

    handleEndTimeClearChange(t) {
        let event = this.state.event;
        if (event.end_time === '') {
            event.end_time = moment().format('YYYY-MM-DDTHH:mm:00ZZ');
        } else {
            event.end_time = '';
        }
        this.setState({event: event});
    }

    handlePhoneChange(e) {
        let event = this.state.event;
        event.phone = e.target.value;
        this.setState({event: event});
    }

    handleTicketUrlChange(e) {
        let event = this.state.event;
        event.ticketUrl = e.target.value;
        this.setState({event: event});
    }

    handleCategoryChange(value) {
        let event = this.state.event;
        event.category = value;
        this.setState({event: event});
    }

    handleTagsChange(e) {
        let event = this.state.event;
        event.tags = e.target.value;
        this.setState({event: event});
    }

    handleMinPriceChange(e) {
        let event = this.state.event;
        event.price = event.price || {};
        event.price.from = e.target.value;
        this.setState({event: event});
    }

    handleMaxPriceChange(e) {
        let event = this.state.event;
        event.price = event.price || {};
        event.price.to = e.target.value;
        this.setState({event: event});
    }

    handleTextPriceChange(e) {
        let event = this.state.event;
        event.price = event.price || {};
        event.price.text = e.target.value;
        this.setState({event: event});
    }

    handleInvalidChange() {
        let event = this.state.event;
        event.invalid = !event.invalid;
        this.setState({event: event});
    }

    handleHiddenChange() {
        let event = this.state.event;
        event.hidden = !event.hidden;
        this.setState({event: event});
    }

    handleEditorChoiceChange() {
        let event = this.state.event;
        event.editorChoice = !event.editorChoice;
        this.setState({event: event});
    }

    handlePlaceChange(e) {
        let event = this.state.event;
        event.place = event.place || {};
        event.place.name = e.target.value;
        this.setState({event: event});
    }

    handleAddressChange(e) {
        let event = this.state.event;
        event.place = event.place || {};
        event.place.location = {street: e.target.value};
        this.setState({event: event});
    }

    render() {
        const {show, onHide, title, categories} = this.props;
        const event = this.state.event;
        return (
            <Modal
                show={show}
                onHide={onHide}
                bsSize="large"
                backdrop="static"
            >
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
                        <Row>
                            <Col md={7}>
                                <FieldGroup
                                    id="image"
                                    type="text"
                                    label="Зображення"
                                    placeholder="Вставте лінк на зображення"
                                    value={_.get(event, 'cover.source', '')}
                                    onChange={this.handleImageChange}
                                />
                                <ControlLabel>Категорія</ControlLabel>
                                <CategoryDropdown
                                    categories={categories}
                                    event={event}
                                    onChange={this.handleCategoryChange}
                                />
                            </Col>
                            <Col md={5}>
                                <img src={_.get(event, 'cover.source', '')} style={{maxWidth: '100%'}}/>
                            </Col>
                        </Row>
                        <FormGroup controlId="description">
                            <ControlLabel>Опис</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Введіть опис події"
                                value={event.description}
                                rows={5}
                                onChange={this.handleDescriptionChange}
                            />
                        </FormGroup>
                        <Row>
                            <Col md={4}>
                                <ControlLabel>Дата від</ControlLabel>
                                <DateTime
                                    onChange={this.handleStartTimeChange}
                                    value={moment(event.start_time)}
                                    timeConstraints={{minutes: {step: 5}}}
                                />
                            </Col>
                            <Col md={4}>
                                <ControlLabel>Дата до</ControlLabel>
                                <DateTime
                                    onChange={this.handleEndTimeChange}
                                    value={event.end_time ? moment(event.end_time) : null}
                                    timeConstraints={{minutes: {step: 5}}}
                                />
                                <input
                                    name="isEndDate"
                                    type="checkbox"
                                    checked={event.end_time === ''}
                                    onChange={this.handleEndTimeClearChange}
                                />
                                {' '}
                                <ControlLabel>не вказано</ControlLabel>
                            </Col>
                            <Col md={4}>
                                <ControlLabel>Тижнева повторюваність</ControlLabel>
                                <EventRecurrenceCheckboxes
                                    weeklyRecurrence={event.weeklyRecurrence}
                                    onChange={this.handleWeeklyRecurrenceChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <FieldGroup
                                    id="priceFrom"
                                    type="text"
                                    label="Ціна від (грн.)"
                                    placeholder="Введіть найменшу ціну в грн."
                                    value={_.get(event, 'price.from', '')}
                                    onChange={this.handleMinPriceChange}
                                />
                            </Col>
                            <Col md={3}>
                                <FieldGroup
                                    id="priceTo"
                                    type="text"
                                    label="Ціна до (грн.)"
                                    placeholder="Введіть найбільшу ціну в грн."
                                    value={_.get(event, 'price.to', '')}
                                    onChange={this.handleMaxPriceChange}
                                />
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="priceText"
                                    type="text"
                                    label="Ціна інше"
                                    placeholder="Наприклад, 'Тільки по запрошеннях'"
                                    value={_.get(event, 'price.text', '')}
                                    onChange={this.handleTextPriceChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <HelpBlock>
                                    <li>ціна невідома - залиште поля порожніми</li>
                                    <li>захід безкоштовний - введіть "0" в поле "Ціна від"</li>
                                    <li>одна ціна - введіть значення тільки в полі "Ціна від"</li>
                                    <li>якщо введено "Ціна інше", то інші поля ігноруються</li>
                                </HelpBlock>
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="ticketUrl"
                                    type="text"
                                    label="Купити квиток"
                                    placeholder="Вставте посилання на сайт для купівлі квитка"
                                    value={event.ticketUrl}
                                    onChange={this.handleTicketUrlChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <FieldGroup
                                    id="phone"
                                    type="text"
                                    label="Телефон"
                                    placeholder="Введіть телефон"
                                    value={event.phone}
                                    onChange={this.handlePhoneChange}
                                />
                            </Col>
                            <Col md={3}>
                                <FieldGroup
                                    id="place"
                                    type="text"
                                    label="Місце проведення (назва)"
                                    placeholder="Введіть назву місця проведення заходу, або адресу якщо назви немає"
                                    value={_.get(event, 'place.name', '')}
                                    onChange={this.handlePlaceChange}
                                />
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="address"
                                    type="text"
                                    label="Детальна адреса місця проведення"
                                    placeholder="Введіть детальну адресу місця проведення заходу"
                                    value={_.get(event, 'place.location.street', '')}
                                    onChange={this.handleAddressChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="metadata">
                                    <ControlLabel>Додаткові поля (JSON)</ControlLabel>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="Введіть додаткові поля в форматі JSON"
                                        value={JSON.stringify(event.metadata)}
                                        rows={5}
                                        onChange={this.handleMetadataChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FieldGroup
                                    id="tags"
                                    type="text"
                                    label="Теги"
                                    placeholder="Введіть теги через кому"
                                    value={event.tags}
                                    onChange={this.handleTagsChange}
                                />
                                <Row>
                                    <Col md={4}>
                                        <input
                                            name="isValid"
                                            type="checkbox"
                                            checked={!event.invalid}
                                            onChange={this.handleInvalidChange}
                                        />
                                        {' '}
                                        <ControlLabel>валідна подія</ControlLabel>
                                    </Col>
                                    <Col md={4}>
                                        <input
                                            name="isHidden"
                                            type="checkbox"
                                            checked={event.hidden}
                                            onChange={this.handleHiddenChange}
                                        />
                                        {' '}
                                        <ControlLabel>прихована подія</ControlLabel>
                                    </Col>
                                    <Col md={4}>
                                        <input
                                            name="editorChoice"
                                            type="checkbox"
                                            checked={event.editorChoice}
                                            onChange={this.handleEditorChoiceChange}
                                        />
                                        {' '}
                                        <ControlLabel>вибір редакції</ControlLabel>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </form>
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