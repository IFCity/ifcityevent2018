import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Events from '../views/events.jsx';
import MostViewed from '../views/mostViewed.jsx';


class ListPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Row>
                    <Col md={9}>
                        <Events {...this.props}/>
                    </Col>
                    <Col md={3}>
                        <MostViewed title="Популярні події" type="mostviewed"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

ListPage.propTypes = {
    events: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        events: state.events,
        categories: state.categories
    };
};

export default connect(mapStateToProps)(ListPage);
