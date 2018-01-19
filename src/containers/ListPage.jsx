import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Events from '../views/events.jsx';


class ListPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Row>
                    <Col md={9}>
                        <Events {...this.props}/>
                    </Col>
                    <Col md={3}>
                        <h4>Вас також можуть зацікавити</h4>
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
