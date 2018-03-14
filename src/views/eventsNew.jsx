import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router-dom';

import {getEventsAction} from '../actions/eventsActions';
import {getCategoriesAction} from '../actions/categoriesActions';
import {NoData, Loading} from '../components/tools.jsx';
import appSettings from '../constants/aplication';
import {placeObj, priceObj} from '../services/logicHelper';
import {getMostViewedAction} from "../actions/mostviewedActions";
import {getFilmAction} from "../actions/filmActions";
import {getChildAction} from "../actions/childActions";
import {getPromoAction} from "../actions/promoActions";


moment.updateLocale('uk', {
    calendar : {
        sameDay : '[Сьогодні] о HH:mm',
        nextDay : '[Завтра] о HH:mm',
        nextWeek : '[Цього тижня] в ddd о HH:mm',
        sameElse : 'ddd о HH:mm'
    }
});

class EventRedesign extends Component {
    constructor(props) {
        super(props);
        this.share = this.share.bind(this);
    }

    share() {
        const {event} = this.props;
        window.FB.init({
            appId: appSettings.FBPageId,
            cookie: true,
            xfbml: true,
            version: 'v2.5'
        });
        window.FB.ui(
            {
                method: 'share',
                href: `http://ifcityevent.com/event/${event._id}`
            },
            (response) => {
                if (response && response.post_id) {
                    // alert('success');
                } else {
                    // alert('Помилка');
                }
            }
        );
    }

    render() {
        const {event, categories} = this.props;
        const detailedLink = `/event/${event._id}`;
        const categoryName = _(categories)
            .filter(item => item.id === event.category)
            .value();
        const tooltip = (
            <Tooltip id="tooltip">Поділитись</Tooltip>
        );
        const tagsArray = _(_.isArray(event.tags) ? event.tags : event.tags.split(','))
            .map(item => {
                item = item.trim();
                return item ? (
                    <Link to={`/tags/${encodeURIComponent(item)}`}>
                        {`#${item}`}
                    </Link>
                ) : null;
            })
            .value();
        const place = placeObj(event.place);
        return (
            <div className="event-new-wrapper">
                <div className="event-new">
                    <aside className="image-content">
                        <Link to={detailedLink}>
                            <div className="image-wrapper">
                                <img className="eds-media-card-content__image eds-max-img"
                                     src={_.get(event, 'cover.source', '')}/>
                            </div>
                        </Link>
                    </aside>
                    <main className="main-content">
                        <div className="date-side">
                            <span className="day">{moment(event.startCalcDate).format('DD')}</span>
                            <span className="month">{moment(event.startCalcDate).format('MMM')}</span>
                        </div>
                        <div className="main-side">
                            <Link to={detailedLink}>
                                <h3>{event.name}</h3>
                            </Link>
                            <span className="place">{moment(event.startCalcDate).calendar()} · {place.name} {place.location ? `(${place.location})` : null}</span>
                            <span className="price">{priceObj(event.price).str}</span>
                        </div>
                    </main>
                    <div className="footer">
                        <span className="category">
                            {_.get(categoryName, '[0].name', event.category)}
                        </span>
                        <div className="tags">
                            {_.get(tagsArray, '[0]', null)}
                            {_.get(tagsArray, '[1]', null)}
                        </div>
                        <span className="links share">
                            <OverlayTrigger placement="top" overlay={tooltip}>
                              <span class="glyphicon glyphicon-share-alt" aria-hidden="true"
                                    onClick={this.share}></span>
                            </OverlayTrigger>
                        </span>
                    </div>
                </div>
            </div>
        );
    };
}

class EventsList extends Component {
    render() {
        let { events, additionalCard } = this.props;
        return (
            <div>
                {events.length ?
                    [
                        events.map(event => {
                            return (
                                <EventRedesign
                                    {...this.props}
                                    event={event}
                                />
                            );
                        }),
                        additionalCard ? additionalCard : null
                    ]
                    : <NoData/>}
            </div>
        );
    }
}

class Events extends Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.getParams = this.getParams.bind(this);
    }

    componentDidMount() {
        this.search(this.getParams(this.props.match.params));
        this.fetchCategories();
    }

    getParams(params) {
        let result = {};
        if (params.categoryid) {
            result.category = params.categoryid;
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        if (typeof (window) !== 'undefined') {
            window.scrollTo(0, 0);
        }
        if ((this.props.match.params.categoryid !== nextProps.match.params.categoryid) ||
            (this.props.match.params.tagname !== nextProps.match.params.tagname) ||
            (this.props.match.params.holiday !== nextProps.match.params.holiday)) {
            this.search(this.getParams(nextProps.match.params));
        }
    }

    search(params) {
        params.page = 1;
        if (this.props.type === 'mostviewed') {
            this.props.dispatch(getMostViewedAction({page: 1}));
        } else if (this.props.type === 'film') {
            this.props.dispatch(getFilmAction({page: 1}));
        } else if (this.props.type === 'child') {
            this.props.dispatch(getChildAction());
        } else if (this.props.type === 'promo') {
            this.props.dispatch(getPromoAction({page: 1}));
        } else {
            this.props.dispatch(getEventsAction(params));
        }
    }

    fetchCategories() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.events;
        const events = data.slice(0, this.props.limit || 6);

        return [
            <Loading {...metadata} mask={true} className="event-region">
                <Row className="event-region-title">
                    <Col sm={6}>
                        <h2>{this.props.title}</h2>
                    </Col>
                    <Col sm={6}>
                        <a className="see-more" href="#">показати більше <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                    </Col>
                </Row>
                <EventsList
                    {...this.props}
                    events={events}
                    categories={this.props.categories.data}
                    dispatch={this.props.dispatch}
                />
                <Row className="event-region-title">
                    <Col sm={12}>
                        <a className="see-more bottom" href="#">показати усі <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></a>
                    </Col>
                </Row>
            </Loading>
        ];
    }
}

Events.propTypes = {
    events: PropTypes.object,
    categories: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default Events;
export { EventsList };
