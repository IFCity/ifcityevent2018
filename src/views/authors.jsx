import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { Loading, NoData } from '../components/tools.jsx';
import { getAuthorsAction } from '../actions/authorsActions';


const Author = ({author}) => {
    if (!author._id) {
        return null;
    }
    const eventsToShow = 5;
    const data = author._id || {};
    let firstEvents = [];
    const count = author.events.length > eventsToShow ? eventsToShow : author.events.length;
    for (let i = 0; i <= count - 1; i++) {
        firstEvents.push(author.events[i])
    }
    let events = _(firstEvents)
        .map(event => {
            const url = `/event/${event._id}`;
            return (
                <li>
                    <Link to={url}>
                        {event.name}
                    </Link>
                </li>
            )
        })
        .value();
    if (author.events.length - eventsToShow > 0) {
        events.push(
            <li>
                <Link to="#">
                    {`ще ${author.events.length - eventsToShow} подій(я)...`}
                </Link>
            </li>
        );
    }
    return (
        <div className="author-panel">
            <img src={_.get(data, 'cover.source', '/public/images/default-event.png')}/>
            <h4>{`${data.name || data.id} (${author.count})`}</h4>
            <ul>{events}</ul>
        </div>
    );
};

class AuthorsList extends Component {
    render() {
        const {authors} = this.props;
        return (
            <div>
                {authors.length ?
                    authors.map(author => (
                        <Author
                            {...this.props}
                            author={author}
                        />
                    ))
                    : <NoData/>}
            </div>
        );
    }
}

class Authors extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.search();
    }

    search() {
        this.props.dispatch(getAuthorsAction());
    }

    render() {
        const {data, metadata} = this.props.authors;
        return [
            <Row>
                <Col md={12}>
                    <h1>Організатори/розповсюджувачі</h1>
                </Col>
            </Row>,
            <Row>
                <Col md={12}>
                    <Loading {...metadata} mask={true}>
                        <AuthorsList authors={data}/>
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Authors.propTypes = {
    authors: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

export default Authors;
