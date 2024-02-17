import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { userService } from '../../services';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userEdit: {},
        };
    }

    state = {};

    // set state
    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await userService.getAllUSers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users,
            });
        }
    };

    /**
     * xử lý khi bấm vào nút thêm người dùng mới
     * hiện model điền thông tin
     */
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };

    /**
     * ẩn hiện modal thêm mới
     */
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    /**
     * ẩn hiện modal sửa
     */
    toggleUserEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal,
        });
    };

    /**
     * tạo người dùng mới
     * @param {object} data : thông tin dữ liệu thêm mới người dùng
     */
    createNewUser = async (data) => {
        try {
            let response = await userService.createNewUser(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModal: false,
                });
                // fire event: phát đi event
                // co data
                // emitter.emit('EVENT_CLEAR_MODAL_DATA', {
                //     'id': 'your id'
                // });

                // ko truyen data
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * xóa người dùng
     * @param {Object} user : thông tin người dùng cần xóa
     */
    handleDeleteUser = async (user) => {
        try {
            let res = await userService.deleteUser(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * bấm vào nút sửa thông tin người dùng
     * @param {Object} user : thông tin người dùng
     */
    handleEditUser = (user) => {
        this.setState({
            isOpenEditModal: true,
            userEdit: user,
        });
    };

    /**
     * sửa thông tin người dùng khi bấm save changes trong modal
     */
    doEditUser =  async (user) => {
        try {
            let res = await userService.editUser(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEditModal: false,
                });
                await this.getAllUsersFromReact();

            } else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenEditModal && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModal}
                        toggleModal={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
                <div className="title text-center">Manager Users</div>
                <div className="mx-1">
                    <button onClick={() => this.handleAddNewUser()} className="btn btn-primary px-3">
                        <i className="fas fa-plus"></i> Add new user
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    className="btn-control btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-control btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
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
