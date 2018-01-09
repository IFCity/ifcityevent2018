import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import {Row, Col} from 'react-bootstrap';


export const NoData = ({children}) => {
    return (
        <Row>
            <Col xs={12}>{children || 'Вибачте, в даній категорії немає наразі подій'}</Col>
        </Row>
    );
};

export const Spinner = ({style}) => (
    <div style={style} className="spinner-container">
        <div className="spinner"/>
    </div>
);

export const Error = ({error}) => (
    <div className="alert alert-danger" role="alert">
        <strong>Loading error</strong> {error.message || 'Unknown error'}
    </div>
);

class Loading extends Component {

    render() {
        const {isProcessing, error, showError, mask, spinner, full, size, className, children} = this.props;
        const style = {display: isProcessing ? 'block' : 'none'};
        const content = !showError || isProcessing || (!isProcessing && !error) ? children : <Error error={error}/>;

        return (
            <div className={classNames('loading', {full: full}, size, className)}>
                {content}
                {mask ? <div style={style} className="mask"/> : null}
                {spinner ? <Spinner style={style}/> : null}
            </div>
        );
    }
}

Loading.defaultProps = {
    metadata: {},
    isProcessing: false,
    showError: true,
    mask: true,
    spinner: true,
    full: false
};

Loading.propTypes = {
    error: PropTypes.object,
    isProcessing: PropTypes.bool,
    mask: PropTypes.bool,
    full: PropTypes.bool,
    spinner: PropTypes.bool,
    size: PropTypes.string
};

export { Loading };
