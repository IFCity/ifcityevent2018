import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import Authors from '../views/authors.jsx';
import MostViewed from '../views/mostViewed.jsx';


class AuthorsPage extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Row>
                    <Col md={9}>
                        <Authors {...this.props}/>
                    </Col>
                    <Col md={3}>
                        <MostViewed/>
                    </Col>
                </Row>
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    authors: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        authors: state.authors
    };
};

export default connect(mapStateToProps)(AuthorsPage);
