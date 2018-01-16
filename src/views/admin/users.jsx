import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import { Loading, NoData } from '../../components/tools.jsx';
import { getUsersAction } from '../../actions/usersActions';


const User = ({user}) => {
    return (
        <tr
            key={user.userID}
        >
            <td>
                <a href={`https://www.facebook.com/${user.userID}`} target="_blank">{user.userID}</a>
            </td>
            <td>
               {user.name || 'не задано'}
            </td>
            <td>
                {user.role}
            </td>
        </tr>
    );
};

class UsersList extends Component {
    render() {
        const { users } = this.props;
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
                            Facebook ID
                        </th>
                        <th>
                            Ім&apos;я
                        </th>
                        <th>
                            Роль
                        </th>
                    </tr>
                </thead>
                <tbody>
                {users.length ?
                    users.map(user => (
                        <User
                            {...this.props}
                            user={user}
                        />
                    ))
                    : noData}
                </tbody>
            </table>
        );
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.search();
    }

    search() {
        this.props.dispatch(getUsersAction());
    }

    render() {
        const {data, metadata} = this.props.users;
        return [
            <Row>
                <Col xs={12}>
                    <h4>Зареєстровані Facebook користувачі</h4>
                </Col>
            </Row>,
            <Row>
                <Col xs={12}>
                    <Loading {...metadata} mask={true}>
                        <UsersList users={data}/>
                    </Loading>
                </Col>
            </Row>
        ];
    }
}

Users.propTypes = {
    users: PropTypes.object,
    authorization: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        authorization: state.authorization
    };
};

export default connect(mapStateToProps)(Users);
