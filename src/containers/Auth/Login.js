import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// import * as actions from "../store/actions";
import * as actions from '../../store/actions';
import './Login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            isShowIcon: false,
        };
    }

    /*
        xử lý thay đổi username
        author: huyltn(29/11)
    */
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    /*
        xử lý thay đổi pasword
        author: huyltn(29/11)
    */
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value,
            isShowIcon:  event.target.value.length > 0 ? true : false,
        });
    };

    /*
        xử lý login
        author: huyltn(29/11)
    */
    handleLogin = () => {
        console.log('username: ', this.state.username, ' password: ', this.state.password);
    };

    /**
     * xử lý ẩn/hiện password
     * @returns 
     */
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-text ">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="form-control"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                            />
                        </div>

                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i class={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}
                                        style={{display: this.state.isShowIcon ? 'block' : 'none'}}
                                    ></i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12">
                            <button
                                onClick={() => {
                                    this.handleLogin();
                                }}
                                className="btn-login"
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="login-forgot-password">Forgot your password?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span>Or Login with</span>
                        </div>
                        <div className="col-12 login-social">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
