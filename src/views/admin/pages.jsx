import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Loading, NoData } from '../../components/tools.jsx';
import { getPagesAction } from '../../actions/pagesActions';


const Page = ({page}) => {
    return (
        <tr
            key={page._id}
        >
            <td>
                <p>{page.id}</p>
                {page.title ?
                    <h4>{page.title}</h4> :
                    <span>Назва не задана, оновіть дані з Facebook</span>}
            </td>
            <td>
                <Button>Синхронізувати з FB</Button>
            </td>
        </tr>
    );
};

class PagesList extends Component {
    render() {
        const { pages } = this.props;
        const noData =
            <tr>
                <td>
                    <NoData>
                        <h1>Немає сторінок</h1>
                    </NoData>
                </td>
            </tr>;
        return (
            <table className="table">
                <tbody>
                {pages.length ?
                    pages.map(page => (
                        <Page
                            {...this.props}
                            page={page}
                        />
                    ))
                    : noData}
                </tbody>
            </table>
        );
    }
}

class Pages extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.search();
    }

    search() {
        this.props.dispatch(getPagesAction());
    }

    render() {
        const {data, metadata} = this.props.pages;
        return [
            <Row>
                <Col md={12}>
                    <h4>Facebook сторінки</h4>
                </Col>
            </Row>,
            <Row>
                <Col md={12}>
                    <Loading {...metadata} mask={true}>
                        <PagesList pages={data}/>
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Pages.propTypes = {
    pages: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(Pages);
