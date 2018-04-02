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
                    <Col md={12}>
                        <Events {...this.props}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

ListPage.propTypes = {
    events: PropTypes.object,
    filteredEvents: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    let data = _.cloneDeep(state.events.data);
    if (props.match.params.categoryid) {
        data = data.filter(item => item.category === props.match.params.categoryid);
    }
    if (props.match.params.tagname) {
        data = data.filter(item => (item.tags || '').toUpperCase().includes(decodeURIComponent(props.match.params.tagname).toUpperCase()));
    }
    return {
        events: {
            data: data,
            metadata: state.events.metadata
        },
        categories: state.categories
    };
};

export default connect(mapStateToProps)(ListPage);
