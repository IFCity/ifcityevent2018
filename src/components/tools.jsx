import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import {Row, Col} from 'react-bootstrap';
import { Route } from 'react-router';


export const NoData = ({children}) => {
    return (
        <Row className="no-data">
            <Col md={12}>{children || 'Немає даних для відображення'}</Col>
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
        <strong>Помилка завантаження</strong> {error.message || 'Невідома помилка'}
    </div>
);

export const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
        if (staticContext)
            staticContext.status = code;
        return children
    }}/>
);

export const NotFound = () => (
    <Status code={404}>
        <Row>
            <Col md={12}>
                <h1>Не можу знайти дану сторінку</h1>
                <p>
                    Дана сторінка більше не існує. Якщо ви перейшли на дану сторінку через пряме посилання, спробуйте знайти
                    те, що вас цікавить почавши з головної сторінки</p>
                <p>
                    В іншому випадку повідомте нам про помилку
                </p>
            </Col>
        </Row>
    </Status>
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
