import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    /**
     * chuyển đổi ngôn ngữ cho ứng dụng
     * @param {string} language mã ngôn ngữ cần thay đổi
     */
    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let language = this.props.language;
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <i className="fas fa-bars"></i>
                        <img className="header-logo" src={logo} alt="logo" />
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="home-header.specialty" />
                                </b>
                            </div>
                            <div className="sub-title">
                                <FormattedMessage id="home-header.search-doctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="home-header.health-facility" />
                                </b>
                            </div>
                            <div className="sub-title">
                                <FormattedMessage id="home-header.select-room" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="home-header.doctor" />
                                </b>
                            </div>
                            <div className="sub-title">
                                <FormattedMessage id="home-header.select-doctor" />
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <b>
                                    <FormattedMessage id="home-header.fee" />
                                </b>
                            </div>
                            <div className="sub-title">
                                <FormattedMessage id="home-header.check-health" />
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <i className="fas fa-question-circle"></i>
                            <FormattedMessage id="home-header.support" />
                        </div>
                        <div className={language === languages.VI ? "language active" : "language"}>
                            <span onClick={() => this.changeLanguage(languages.VI)}>VN</span>
                        </div>
                        <div className={language === languages.EN ? "language active" : "language"}>
                            <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
