import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import _ from 'lodash';

import Events from '../views/events.jsx';


class ListPage extends Component {
    componentDidMount() {
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
    }
    
    componentWillReceiveProps() {
        if (typeof window !== undefined) {
            window.scrollTo(0, 0);
        }
    }

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
        data = data.filter(item => (item.tags || '').toLocaleUpperCase().includes(decodeURIComponent(props.match.params.tagname).toLocaleUpperCase()));
    }
    console.log("STATE -----");
    console.log(state);
    return {
        events: {
            data: data,
            metadata: state.events.metadata
        },
        categories: state.categories,
        tagsLookup: state.tagsLookup || {
            data: [],
            metadata: {}
        }
    };
};

export default connect(mapStateToProps)(ListPage);
