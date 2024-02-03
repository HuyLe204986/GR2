import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { userService } from '../../services';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
        };
    }

    state = {};

    // set state
    async componentDidMount() {
        let response = await userService.getAllUSers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <div className="title text-center">Manager Users</div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                            <button className='btn btn-delete'><i class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
