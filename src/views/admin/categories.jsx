import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Loading, NoData } from '../../components/tools.jsx';
import { getCategoriesAction } from '../../actions/categoriesActions';


const Category = ({category}) => {
    return (
        <tr
            key={category.id}
        >
            <td>
               {category.id}
            </td>
            <td>
                {category.name}
            </td>
        </tr>
    );
};

class CategoriesList extends Component {
    render() {
        const { categories } = this.props;
        const noData =
            <tr>
                <td>
                    <NoData/>
                </td>
            </tr>;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Назва
                        </th>
                    </tr>
                </thead>
                <tbody>
                {categories.length ?
                    categories.map(category => (
                        <Category
                            {...this.props}
                            category={category}
                        />
                    ))
                    : noData}
                </tbody>
            </table>
        );
    }
}

class Categories extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.search();
    }

    search() {
        this.props.dispatch(getCategoriesAction());
    }

    render() {
        const {data, metadata} = this.props.categories;
        return [
            <Row>
                <Col xs={12}>
                    <h4>Категорії подій</h4>
                </Col>
            </Row>,
            <Row>
                <Col xs={12}>
                    <Loading {...metadata} mask={true}>
                        <CategoriesList categories={data}/>
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Categories.propTypes = {
    categories: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(Categories);
